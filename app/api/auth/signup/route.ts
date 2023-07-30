import prismaDB from "@/lib/prismaDB";
import { NextRequest, NextResponse } from "next/server";

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
    const existingEmail = await prismaDB.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    if (existingEmail) {
      return new NextResponse("Email already registered", { status: 400 });
    }

    // try getting if user with this username exists
    const existingUsername = await prismaDB.user.findUnique({
      where: {
        username: userInfo.username,
      },
    });

    if (existingEmail) {
      return new NextResponse("Email already registered", { status: 400 });
    }
  } catch (error) {
    console.log("USER_SIGNUP_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
