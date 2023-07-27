import MobileSidebar from "@/components/Navigation/MobileSidebar";
import { getApiLimitCount } from "@/lib/apiLimit";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  userName: string;
  isPro: boolean;
}

const Navbar = async ({ userName, isPro }: NavbarProps) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="flex items-center p-4">
      {/* opens mobile sidebar */}
      <MobileSidebar
        apiLimitCount={apiLimitCount}
        userName={userName}
        isPro={isPro}
      />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
