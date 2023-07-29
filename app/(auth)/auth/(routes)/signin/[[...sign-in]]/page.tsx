// import { SignIn } from "@clerk/nextjs";

import AuthForm from "@/components/Auth/AuthForm";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col items-center justify-center">
          <Link href={"/"} className="flex gap-x-2 items-center lg:w-1/2 mb-4">
            <div className="w-12 h-12 relative bg-blue-200 rounded-md">
              <Image src={"/logo.png"} alt="app logo" fill />
            </div>
            <h2>Synth</h2>
          </Link>
          <AuthForm />
        </div>
        <div className="hidden xl:block h-full w-full bg-ai-bg bg-center bg-cover bg-blend-color-burn">
          <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50">
            <div className="relative h-full w-full">
              <span className="text-black absolute bottom-24 bg-opacity-70 bg-white right-0 py-12 pl-6 rounded-tl-2xl text-4xl w-1/2">
                Explore the power of AI generations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
