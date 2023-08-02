// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { getServerSession } from "next-auth/next";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";
import { authOptions } from "@/lib/authOptions";
import prismaDB from "@/lib/prismaDB";
import { Prisma } from "@prisma/client";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation.",
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  try {
    // const { userId } = auth();

    const body = await req.json();
    const { messages } = body;

    if (!session) {
      return new NextResponse("Unauthorized ", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key required ", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required ", { status: 400 });
    }

    // check if on free trial
    const freeTrial = await checkAPILimit();
    // check if pro subscriber
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    // save data to db
    if (messages.length === 1) {
      const createdAt = new Date();
      // This is a new code generation chat session so create new code collection in databse
      await prismaDB.code.create({
        data: {
          userId: session.user.id,
          createdAt: createdAt as unknown as Prisma.InputJsonValue,
          codeGen: {
            create: {
              responses: [...messages, response.data.choices[0].message],
            },
          },
        },
      });
    } else {
      // make an update to an existing generation
      const updatedCodeGen = [...messages, response.data.choices[0].message];
      // find most recent code session created
      const mostRecentCode = await prismaDB.code.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });

      // if there's a most recent creation
      if (mostRecentCode) {
        // update codegens here
        await prismaDB.codeGen.update({
          where: {
            codeId: mostRecentCode.id,
          },
          data: {
            responses: updatedCodeGen,
          },
        });
      } else {
        return new NextResponse(
          "Code collection not created yet. Please create a new one first",
          { status: 400 }
        );
      }
    }

    if (!isPro) {
      // increase api limit count
      await increaseAPILimit();
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("CODEGEN_POST_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
