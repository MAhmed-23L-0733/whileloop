import { dbConnect } from "@/app/lib/db";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { email } = await params;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ email }).select("name email createdAt");

    if (user) {
      return NextResponse.json({
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
