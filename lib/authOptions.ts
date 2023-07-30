import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaAdapter from "@/prisma/prisma";
import prismaDB from "./prismaDB";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaAdapter),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your_cool_username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        console.log({ credentials });
        // retrieve credentials from database to verify credentials
        const user = { id: "21", username: "Collins", password: "xxxxxxx" };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   // check if email account exists
    //   console.log({ user });
    //   if (user.email) {
    //     const existingAccount = await findExistingUserByEmail(user.email);

    //     if (existingAccount) {
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    async session({ session, token, user }) {
      // console.log({ session });
      session.user.id = user.id;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      // console.log({ baseUrl, url });
      return Promise.resolve(url);
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

// get an existing user account by email address
async function findExistingUserByEmail(email: string) {
  const user = await prismaDB.user.findUnique({
    where: {
      email,
    },
  });

  if (user?.email === email) {
    return true;
  }
  return false;
}
