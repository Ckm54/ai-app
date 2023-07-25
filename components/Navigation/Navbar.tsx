import React from "react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/Navigation/MobileSidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      {/* opens mobile sidebar */}
      <MobileSidebar />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
