// handle stripe payments
// import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDB from "@/lib/prismaDB";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    // const { userId } = auth();
    // const user = await currentUser();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // try finding current user's subscription
    ///// TODO::: FIX USERID
    const userSubscription = await prismaDB.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      // user has some subscription already
      // dont create checkout just redirect to billing
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // no stripe subscription
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      // customer_email: user.emailAddresses[0].emailAddress,
      customer_email: session.user.email!,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Synth pro",
              description: "Unlimited AI generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
