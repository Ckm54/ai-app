// import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";

export const UserAvatar = async () => {
  // const { user } = useUser();
  const session = await getServerSession();

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={session?.user?.image || ""} />
      <AvatarFallback>
        {session?.user?.name?.charAt(0)}
        {session?.user?.email?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
