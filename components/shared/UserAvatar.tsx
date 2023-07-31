"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export const UserAvatar = () => {
  // const { user } = useUser();
  const { data: session } = useSession();

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={session?.user?.image || ""} />
      <AvatarFallback>
        {session?.user?.name?.charAt(0).toUpperCase() ??
          session?.user?.email?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
