"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("Bulling error", error);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };
  return (
    <Button
      variant={isPro ? "default" : "premium"}
      onClick={handleClick}
      disabled={loading}
    >
      {isPro ? "Manage subscription" : "Upgrade to pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
