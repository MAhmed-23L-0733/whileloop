import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { email, password, name, confirmpassword } = await req.json();
  if (!email || !password || !name || !confirmpassword) {
    return NextResponse.json(
      {
        error: "Please complete all the fields!",
      },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const existing = await User.findOne({ email });
    if (existing) {
      alert("User already exists!");
      return new NextResponse({
        status: 400,
        error: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //savnig user if user does not exist
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    return new NextResponse(
      JSON.stringify({
        status: 200,
        error: null,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        error: "Registration was unsuccessful!",
      })
    );
  }
};
