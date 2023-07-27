import React from "react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/Navigation/MobileSidebar";
import { getApiLimitCount } from "@/lib/apiLimit";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="flex items-center p-4">
      {/* opens mobile sidebar */}
      <MobileSidebar apiLimitCount={apiLimitCount} />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
