// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth";
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
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    // create record in database
    await prismaDB.music.create({
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
    console.log("MUSIC_GENERATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
