"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

interface OauthButtonProps {
  imageSrc: string;
  btnText: string;
  onClickCallback: () => void;
}

const OauthButton = ({
  imageSrc,
  btnText,
  onClickCallback,
}: OauthButtonProps) => {
  const { status } = useSession({ required: true });
  return (
    <div>
      <Button
        onClick={onClickCallback}
        variant={"outline"}
        size={"lg"}
        className="flex items-center gap-x-4 w-full"
      >
        <div className="w-6 h-6 relative ">
          <Image src={imageSrc} alt={btnText} fill />
        </div>
        {btnText}{" "}
        {status === "loading" && <Loader className="w-4 h-4 animate-spin" />}
      </Button>
    </div>
  );
};

export default OauthButton;
