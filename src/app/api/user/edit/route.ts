// app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import { dbconnect } from "@/lib/dbConnection";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/options"; // path to your NextAuth config
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  await dbconnect();

  try {
    // ✅ Get session with proper config
    const session = await getServerSession(authOption);
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

    // ✅ Select password explicitly if schema has select: false
    const user = await User.findOne({ email: session.user.email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Update fields
    if (name) user.name = name;
    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (websiteUrl !== undefined) user.websiteUrl = websiteUrl;
    if (avatarUrl) user.avatarUrl = avatarUrl;

    // ✅ If password provided, hash it
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // ✅ Save and check result
    const updatedUser = await user.save();
    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("PATCH /user/profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
