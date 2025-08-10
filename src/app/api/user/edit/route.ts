import { NextResponse } from "next/server";
import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  await dbconnect();

  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      username,
      bio,
      location,
      websiteUrl,
      avatarUrl,
      password
    } = body;

    // Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update fields (skip updatedAt — Mongo timestamps handle it)
    if (name) user.name = name;
    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (websiteUrl !== undefined) user.websiteUrl = websiteUrl;
    if (avatarUrl) user.avatarUrl = avatarUrl;

    // If password provided, hash it
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
