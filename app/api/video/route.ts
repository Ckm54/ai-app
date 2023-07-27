import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized ", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required ", { status: 400 });
    }

    // check if on free trial
    const freeTrial = await checkAPILimit();

    if (!freeTrial) {
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

    // increase api limit count
    await increaseAPILimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log("VIDEO_GENERATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
