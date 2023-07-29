// import { SignIn } from "@clerk/nextjs";

import AuthForm from "@/components/Auth/AuthForm";

export default function Page() {
  return (
    <div className="h-screen w-full">
      <div className="grid md:grid-cols-2 h-full">
        <div className="flex items-center justify-center">
          <AuthForm />
        </div>
        <div className="hidden md:block h-full w-full bg-ai-bg bg-center bg-cover bg-blend-color-burn">
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
