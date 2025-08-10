import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";

export async function POST(request: Request) {
  await dbconnect();
  try {
    const { username, code } = await request.json();

    if (!username || !code) {
      return Response.json(
        { success: false, message: "Username and code are required" },
        { status: 400 }
      );
    }

    const decodeuser = decodeURIComponent(username);
    const user = await User.findOne({ username: decodeuser });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyToken === code;
    const isCodeNotExpired =
      user.verifyTokenExpiry && new Date(user.verifyTokenExpiry) > new Date();

    if (!isCodeValid) {
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    }

    if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: "Verification code has expired" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();

    return Response.json(
      { success: true, message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
