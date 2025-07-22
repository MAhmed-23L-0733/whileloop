import { dbConnect } from "@/app/lib/db";
import { Video } from "@/app/models/video";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { User } from "@/app/models/user";
import { authOptions } from "@/app/lib/auth";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const { comment, email } = await req.json();
  await dbConnect();
  const video = await Video.findById(id);
  const user = await User.findOne({ email });
  if (video) {
    video.comments.push({
      authoremail: user.name,
      description: comment,
    });
    await video.save();
    revalidatePath("/");
    return new NextResponse(
      JSON.stringify({
        status: 200,
        name: user.name,
      })
    );
  }
  return new NextResponse("Video not found", {
    status: 404,
  });
}
