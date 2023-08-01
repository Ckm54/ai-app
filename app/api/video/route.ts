// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getServerSession } from "next-auth/next";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";
import { authOptions } from "@/lib/authOptions";
import prismaDB from "@/lib/prismaDB";
import { Prisma } from "@prisma/client";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  try {
    // const { userId } = auth();

    const body = await req.json();
    const { prompt } = body;

    if (!session) {
      return new NextResponse("Unauthorized ", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required ", { status: 400 });
    }

    // check if on free trial
    const freeTrial = await checkAPILimit();
    // check if pro subscriber
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    // create record in database
    await prismaDB.video.create({
      data: {
        prompt,
        responseData: response as unknown as Prisma.InputJsonValue,
        userId: session.user.id,
      },
    });

    if (!isPro) {
      // increase api limit count
      await increaseAPILimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("VIDEO_GENERATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
