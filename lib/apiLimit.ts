// import { auth } from "@clerk/nextjs";

import prismaDB from "@/lib/prismaDB";
import { MAX_FREE_COUNTS } from "@/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

// increase api limitcount as user interracts with the various endpoints
export const increaseAPILimit = async () => {
  // const { userId } = auth();
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (!session) {
    return;
  }

  const userApiLimit = await prismaDB.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (userApiLimit) {
    // update its count
    await prismaDB.userApiLimit.update({
      where: {
        userId: session.user.id,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    // create new record
    await prismaDB.userApiLimit.create({
      data: {
        userId: session.user.id,
        count: 1,
      },
    });
  }
};

// check if user has reached the limit of free usage
export const checkAPILimit = async () => {
  // const { userId } = auth();
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const userApiLimit = await prismaDB.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  // if user hasn't used any free generation or has used less than max count
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    // user has used all free offers
    return false;
  }
};

export const getApiLimitCount = async () => {
  // const { userId } = auth();
  const session = await getServerSession(authOptions);

  if (!session) {
    return 0;
  }

  // fetch user api limit
  const userApiLimit = await prismaDB.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
