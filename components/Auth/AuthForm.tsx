"use client";
import OauthButton from "@/components/shared/OauthButton";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleProviderSignin = async (provider: string) => {
    setErrorMsg(null);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      // console.log("An error occured: ", error);
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full px-8 md:px-20 lg:px-0 lg:w-1/2">
      <h1 className="text-4xl font-bold">
        {isLogin ? "Login to account" : "Create an account"}
      </h1>

      <div className="w-full flex flex-col gap-y-4 my-5">
        <div>{errorMsg && <p>{errorMsg}</p>}</div>
        <OauthButton
          imageSrc="/google.png"
          btnText="Continue with Google"
          onClickCallback={() => handleProviderSignin("google")}
        />
        <OauthButton
          imageSrc="/github.png"
          btnText="Continue with Github"
          onClickCallback={() => handleProviderSignin("github")}
        />
      </div>

      <div className="flex relative py-5 items-center justify-center w-full">
        <div className="w-20 border-t border-gray-400" />
        <span className="text-muted-foreground flex-shrink mx-4">OR</span>
        <div className="w-20 border-t border-gray-400" />
      </div>

      <p className="text-muted-foreground py-2">
        Enter credentials to {isLogin ? "login" : "signup"}
      </p>

      <div className="w-full">
        <div>
          <div>
            {isLogin ? (
              <LoginForm toggleForm={() => setIsLogin(false)} />
            ) : (
              <SignupForm toggleForm={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
