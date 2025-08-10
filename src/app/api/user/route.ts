// /app/api/user/route.ts
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options"
import { NextResponse } from "next/server";
import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";

export async function GET() {
  const session = await getServerSession(authOption);

  if (!session?.user?.username) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbconnect();

  const user = await User.findOne({ username: session.user.username }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
