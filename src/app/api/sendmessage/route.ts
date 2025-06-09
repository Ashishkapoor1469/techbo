import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
import { Message } from "@/models/userModel";

export async function POST(request: Request) {
  await dbconnect();

  const { username, content } = await request.json();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "u=User not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.Messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "message sent succesfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Err adding messages", error);

    return Response.json(
      {
        success: false,
        messages: "Internal server err",
      },
      { status: 500 }
    );
  }
}
