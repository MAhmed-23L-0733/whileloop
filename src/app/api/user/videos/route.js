import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import { Video } from "@/app/models/video";
import { User } from "@/app/models/user";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email }).populate({
      path: "videos",
      model: Video,
      options: { sort: { createdAt: -1 } }, // Sort by newest first
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user info and their videos
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        videosCount: user.videos.length,
      },
      videos: user.videos || [],
    });
  } catch (error) {
    console.error("Error fetching user videos:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
