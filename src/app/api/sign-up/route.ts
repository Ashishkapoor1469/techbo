import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationEmails";

export async function POST(request: Request) {
  await dbconnect();
  try {
    const { username, email, password } = await request.json();

    const existuserverify = await User.findOne({
      username,
      isVerified: true,
    });
    if (existuserverify) {
      return Response.json(
        {
          success: false,
          message: "User already exists with this username",
        },
        {
          status: 400,
        }
      );
    }

    const existuserbyemail = await User.findOne({ email });
    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existuserbyemail) {
        if(existuserbyemail.isVerified){
            return Response.json({
                success: false,
                message: "User already exists with this email",
            },{
                status: 400,
            }
        )
        }else{
            const hashpassword = await bcrypt.hash(password, 10);
            existuserbyemail.password =hashpassword;
            existuserbyemail.verifyToken =verifycode;
            existuserbyemail.verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            await existuserbyemail.save();
        }
    } else {
      const hashpassword = await bcrypt.hash(password, 10);
      const expirydate = new Date();
      expirydate.setHours(expirydate.getHours() + 24);
      const newUser = new User({
        username,
        email,
        password: hashpassword,
        createdAt: Date.now(),
        isVerified: false,
        verifycode,
        verifyTokenExpiry: expirydate,
        isAcceptingMessage: true,
        Post: [],
      });
      await newUser.save();
    }

    // Send verification email

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifycode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Error sending verification email",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      {
        status: 201,
      }
    );


  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
