import { UserButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
