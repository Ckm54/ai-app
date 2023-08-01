// checks if current user has a subscription or not
// also check if subscription has expired or not
// import { auth } from "@clerk/nextjs";

import { getServerSession } from "next-auth";
import prismaDB from "./prismaDB";
import { authOptions } from "./authOptions";

const DAY_IN_MILLISECONDS = 86_400_000;

export const checkSubscription = async () => {
  // const { userId } = auth();
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  // get a user subscription
  const userSubscription = await prismaDB.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    // user has no active subscription
    return false;
  }

  // user has a subscription, check if valid
  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MILLISECONDS >
      Date.now();

  return !!isValid;
};
