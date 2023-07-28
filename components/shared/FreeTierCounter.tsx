"use client";
import React from "react";
import { Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/useProModal";
import UserMenu from "@/components/shared/UserMenu";
// import { UserButton } from "@clerk/nextjs";
// import { User } from "@clerk/nextjs/dist/types/server";

interface FreeTierCounterProps {
  apiLimitCount: number;
  isPro: boolean;
  userName: string;
}

const FreeTierCounter = ({
  apiLimitCount,
  isPro,
  userName,
}: FreeTierCounterProps) => {
  const [mounted, setMounted] = React.useState(false);
  const openModal = useProModal((state) => state.onOpen);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      {isPro ? (
        <div className="flex items-center p-2 bg-green-500/10 rounded-md">
          <p className="text-sm font-semibold">You are a pro user</p>
          <Zap className="w-4 h-4 ml-3 fill-orange-500 text-orange-500" />
        </div>
      ) : (
        <Card className="bg-white/10 border-0">
          <CardContent className="py-6">
            <div className="text-center text-sm text-white mb-4 space-y-2">
              <p>
                {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
              </p>
              <Progress
                className="h-3"
                value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              />
            </div>
            <Button
              className="w-full"
              variant={"premium"}
              onClick={() => openModal()}
            >
              Upgrade to pro <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </CardContent>
        </Card>
      )}
      <div className="flex space-x-2 mt-2 py-1">
        {/* <UserButton afterSignOutUrl="/" /> */}
        <p>{userName}</p>
        <UserMenu />
      </div>
    </div>
  );
};

export default FreeTierCounter;
