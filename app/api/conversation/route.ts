// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  console.log({ session });
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
      messages,
    });

    // add this generation to database
    if (messages.length === 1) {
      const createdAt = new Date();
      // this is the begining of a new chat so create a new chat in database for this user
      await prismaDB.chat.create({
        data: {
          userId: session.user.id,
          createdAt: createdAt as unknown as Prisma.InputJsonValue,
          conversation: {
            create: {
              responses: [...messages, response.data.choices[0].message],
            },
          },
        },
      });
    } else {
      const updatedMessages = [...messages, response.data.choices[0].message];
      // find the latest or most recent chat created
      const mostRecentChat = await prismaDB.chat.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        take: 1, // retrieve only first document
      });

      if (mostRecentChat) {
        // update the conversations of this chat
        await prismaDB.conversation.update({
          where: {
            chatId: mostRecentChat.id,
          },
          data: {
            responses: updatedMessages,
          },
        });
      } else {
        return new NextResponse(
          "Chat collection not created yet. Please create a new one first",
          { status: 400 }
        );
      }
    }

    // create conversations within this chat

    if (!isPro) {
      // increase api limit count
      await increaseAPILimit();
    }

    return NextResponse.json(response.data.choices[0].message, { status: 200 });
  } catch (error) {
    console.log("CONVERSATION_POST_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
