import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Navigation/Sidebar";
import { getApiLimitCount } from "@/lib/apiLimit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // get user api limit count
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="h-full relative">
      {/* sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>

      <main className="md:pl-72">
        {/* navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
