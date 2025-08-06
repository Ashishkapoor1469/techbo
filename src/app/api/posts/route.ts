import { dbconnect } from "@/lib/dbConnection";
import { Post } from "@/models/userModel";
import { NextRequest } from "next/server";
export async function GET(req:NextRequest) {
  await dbconnect();
const {searchParams} = new URL(req.url);
const skip = parseInt(searchParams.get("skip")||"0");
const limit = parseInt(searchParams.get("limit")||"10");

  // Fetch posts from the database, sorted by creation date, with pagination
  // Adjust the query as needed to filter or sort posts
  try {
    const posts = await Post.find().sort({createdAt:-1}).skip(skip).limit(limit).exec();
    return new Response(JSON.stringify(posts),{
      status:200,
      headers:{ "Content-Type": "application/json"}
    })
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}