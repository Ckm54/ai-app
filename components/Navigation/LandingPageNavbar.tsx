"use client";
import { signIn, useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingPageNavbar = () => {
  const { data, status } = useSession();
  console.log(status, data);
  const router = useRouter();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href={"/"} className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill src={"/logo.png"} alt="app logo" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Synth
        </h1>
      </Link>

      <div className="flex items-center gap-x-3">
        {/* <Link href={session ? "/dashboard" : "/sign-up"}> */}
        <Button
          variant={"outline"}
          className="rounded-full"
          onClick={() =>
            status !== "loading" && status === "authenticated"
              ? router.push("/synthai/dashboard")
              : signIn()
          }
        >
          Get started
        </Button>
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
