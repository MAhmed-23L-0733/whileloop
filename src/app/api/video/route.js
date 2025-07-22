import { Video } from "@/app/models/video";
import { User } from "@/app/models/user";
import { dbConnect } from "../../lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  try {
    await dbConnect();

    const videos = await Video.find().sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch the videos",
    });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        error: "Unauthorized",
      });
    }
    const body = await req.json();
    console.log(body);
    if (!body.title || !body.description || !body.thumbnailUrl) {
      return NextResponse.json({
        error: "Please provide all the details",
      });
    }
    await dbConnect();
    const videoData = {
      ...body,
      author: session.user.email, // Set the author to the user's email
      controls: body?.controls ?? true,
      transformations: {
        height: 1920,
        width: 1080,
        quality: body?.transformations?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoData);

    // Update the user's videos array
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $push: { videos: newVideo._id } },
      { new: true }
    );

    return NextResponse.json({
      newVideo,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to create the video",
    });
  }
}
