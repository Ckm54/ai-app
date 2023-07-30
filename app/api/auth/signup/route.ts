import prismaDB from "@/lib/prismaDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();
    const { userInfo } = body;

    if (!userInfo.username) {
      return new NextResponse("Username is required", { status: 401 });
    }

    if (!userInfo.email) {
      return new NextResponse("Email address is required", { status: 401 });
    }

    if (!userInfo.password) {
      return new NextResponse("Password is required", { status: 401 });
    }

    // try getting if user with this email exists
    const existingUser = await prismaDB.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    // check if user with this username exists
    if (existingUser && existingUser.username === userInfo.username) {
      return new NextResponse("A user with this username already exists", {
        status: 400,
      });
    }

    if (existingUser) {
      return new NextResponse("Email already registered", { status: 400 });
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);

    // create user in database
    await prismaDB.user.create({
      data: {
        email: userInfo.email,
        password: hashedPassword,
        username: userInfo.username,
      },
    });

    return new NextResponse("User registered successfully", { status: 200 });
  } catch (error) {
    console.log("USER_SIGNUP_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
