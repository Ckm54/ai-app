import { auth } from "@clerk/nextjs";

import prismaDB from "@/lib/prismaDB";
import { MAX_FREE_COUNTS } from "@/constants";

// increase api limitcount as user interracts with the various endpoints
export const increaseAPILimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismaDB.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    // update its count
    await prismaDB.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    // create new record
    await prismaDB.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

// check if user has reached the limit of free usage
export const checkAPILimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismaDB.userApiLimit.findUnique({
    where: {
      userId,
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
