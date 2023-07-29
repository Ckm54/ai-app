import MobileSidebar from "@/components/Navigation/MobileSidebar";
import { getApiLimitCount } from "@/lib/apiLimit";
import { getServerSession } from "next-auth";
import UserMenu from "@/components/shared/UserMenu";
import { authOptions } from "@/lib/authOptions";
// import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  userName: string;
  isPro: boolean;
}

const Navbar = async ({ userName, isPro }: NavbarProps) => {
  const apiLimitCount = await getApiLimitCount();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center p-4">
      {/* opens mobile sidebar */}
      <MobileSidebar
        apiLimitCount={apiLimitCount}
        userName={userName}
        isPro={isPro}
      />

      <div className="flex w-full justify-end">
        {/* <UserButton afterSignOutUrl="/" /> */}
        {session?.user?.email}
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
