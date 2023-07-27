"use client";
import { Crisp } from "crisp-sdk-web";
import React from "react";

const CrispChat = () => {
  React.useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CRISP_APP_ID) {
      return;
    }
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_APP_ID);
  }, []);
  return null;
};

export default CrispChat;
