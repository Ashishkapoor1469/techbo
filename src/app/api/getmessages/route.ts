import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
import { User as Userd } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbconnect();
  const session = await getServerSession(authOption);
  const user = session?.user;
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = new mongoose.Types.ObjectId(user?._id);
  try {
    const user = await User.aggregate([
        {$match:{id:userId}},
        {$unwind:"$messages"},
        {$sort:{"messages.createdAt":-1}},
        {$group:{_id:'$_id',messages:{$push:"$messages"}}}
    ])
if(!user|| user.length===0){
    return Response.json({
        success:false,
        messages:"no messages found"
    },
    {status:401}
)
}

return Response.json({
success:true,
messages:user[0].messages
},
{status:200}
)

  } catch (error) {
    console.log("unexpected Err",error);
    
    return Response.json({
        success:false,
        messages:"Not Authenticated"
    },
    {status:401}
)
  }
}
