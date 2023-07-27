"use client";
import { Crisp } from "crisp-sdk-web";
import React from "react";

const CrispChat = () => {
  React.useEffect(() => {
    Crisp.configure("4d1b01c5-cd65-4079-b618-96620a03a8f4");
  }, []);
  return null;
};

export default CrispChat;
