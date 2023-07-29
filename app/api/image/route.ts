// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  try {
    // const { userId } = auth();

    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!session) {
      return new NextResponse("Unauthorized ", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key required ", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required ", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required ", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required ", { status: 400 });
    }

    // check if on free trial
    const freeTrial = await checkAPILimit();
    // check if pro subscriber
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const response = await openAI.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      // increase api limit count
      await increaseAPILimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("IMAGE_CREATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
