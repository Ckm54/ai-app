"use client";
import React from "react";
import OauthButton from "@/components/shared/OauthButton";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Button } from "../ui/button";

const AuthForm = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className="flex flex-col items-start justify-center w-1/2 h-full">
      <h1 className="text-4xl font-bold">
        {isLogin ? "Login to account" : "Create an account"}
      </h1>
      <p className="text-muted-foreground py-2">
        Enter credentials to {isLogin ? "login" : "signup"}
      </p>

      <div className="w-full flex flex-col gap-y-4 my-5">
        <OauthButton
          imageSrc="/google.png"
          btnText="Continue with Google"
          onClickCallback={() => {}}
        />
        <OauthButton
          imageSrc="/github.png"
          btnText="Continue with Github"
          onClickCallback={() => {}}
        />
      </div>

      <div className="flex relative py-5 items-center justify-center w-full">
        <div className="w-20 border-t border-gray-400" />
        <span className="text-muted-foreground flex-shrink mx-4">OR</span>
        <div className="w-20 border-t border-gray-400" />
      </div>

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
