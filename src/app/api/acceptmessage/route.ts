import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
// import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
// import { User as Userd } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOption);
  const user = session?.user;
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = user?._id;
  const { acceptMessage } = await request.json();
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isAccepted: acceptMessage,
      },
      { new: true }
    );
    if (!UpdatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message accepted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in accept message:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to accept message",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOption);
  const user = session?.user;
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = user?._id;
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          messages: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error in fetching user:", error);
    return Response.json(
      {
        success: false,
        messages: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}
