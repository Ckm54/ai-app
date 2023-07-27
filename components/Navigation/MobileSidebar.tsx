"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Navigation/Sidebar";
import { User } from "@clerk/nextjs/dist/types/server";

interface MobileSidebarProps {
  apiLimitCount: number;
  userName: string;
  isPro: boolean;
}

const MobileSidebar = ({
  apiLimitCount,
  userName,
  isPro,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        {/* <Button variant={"ghost"} size={"icon"} className="md:hidden"> */}
        <Menu />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar
          apiLimitCount={apiLimitCount}
          userName={userName}
          isPro={isPro}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
