import { dbconnect } from "@/lib/dbConnection";
import { Post } from "@/models/userModel";

export async function GET() {
  await dbconnect();

  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10).exec();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}