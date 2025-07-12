import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
import { z } from "zod";
import { validUser } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: validUser,
});

export async function GET(request: Request) {
 if(request.method !== 'GET') {
    return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }
 
  await dbconnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    
    // Validate the zod parameters
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log("Result of zod validation: ", result);
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: usernameError
            ? usernameError.join(", ")
            : "Invalid username",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const existverifyUser = await User.findOne({ username, isVerified: true });
    if (existverifyUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error checking user name ", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
