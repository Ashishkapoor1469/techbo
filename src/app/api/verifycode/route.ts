import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
// import {z} from "zod";
// import {validUser} from "@/schemas/signUpSchema";

export async function POST(request: Request) {
await dbconnect();
try {
    const {username,code } = await request.json();
   const decodeuser = decodeURIComponent(username);
const user = await User.findOne({username: decodeuser, verificationCode: code})
if (!user) {
    return Response.json(
        { 
            success:false,
            message: "Invalid username or verification code",
         },
        { status: 400 }
    )
}
const iscodevalid = user.verifyToken===code;
const iscodenotexpired = user.verifyTokenExpiry && new Date(user.verifyTokenExpiry) > new Date();
if(iscodevalid&& iscodenotexpired){
    user.isVerified = true;
    await user.save();

    return Response.json(
        { 
            success:true,
            message: "User verified successfully",
         },
        { status: 200 }
    )
}
else if(!iscodenotexpired){
return Response.json(
    { 
        success:false,
        message: "Verification code has expired",
     },
    { status: 400 }
)
}else{
    return Response.json(
        { 
            success:false,
            message: "Invalid verification code",
         },
        { status: 400 }
    )
}

    
} catch (error) {
    console.log("Error verifying user",error);
        return Response.json(
            { 
                success:false,
                message: "Error verifying user",
             },
            { status: 500 }
        )
}
}