import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Navigation/Sidebar";
import { getApiLimitCount } from "@/lib/apiLimit";
import { authOptions } from "@/lib/authOptions";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth";
// import { currentUser } from "@clerk/nextjs";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // get user api limit count
  const apiLimitCount = await getApiLimitCount();
  // const user = await currentUser();
  const session = await getServerSession(authOptions);
  const isPro = await checkSubscription();

  // const userName = user?.firstName + " " + user?.lastName;
  const userName = session?.user?.email ? session.user.email : "";

  return (
    <div className="h-full relative">
      {/* sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar
          apiLimitCount={apiLimitCount}
          userName={userName}
          isPro={isPro}
        />
      </div>

      <main className="md:pl-72">
        {/* navbar */}
        <Navbar userName={userName} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
