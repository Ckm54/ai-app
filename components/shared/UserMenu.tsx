"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <>
      {status === "loading" ? (
        <div className="w-max p-4 border rounded-md">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-x-2 justify-center px-4 py-2 rounded-md border w-max cursor-pointer">
              <p>{session?.user.name}</p>
              <Avatar>
                <AvatarImage
                  src={session?.user.image ? session.user.image : "/avatar.png"}
                  alt={session?.user.name ? session.user.name : "user avatar"}
                />
                <AvatarFallback>
                  {session?.user.name
                    ? session?.user.name[0].toUpperCase()
                    : "A"}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: "http://localhost:3000/" });
                router.replace("/");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default UserMenu;
