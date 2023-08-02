import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaDB from "./prismaDB";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaDB),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // RE-ENABLE CREDENTIALS PROVIDER
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email address:",
          type: "email",
          placeholder: "your email address",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        // retrieve credentials from database to verify credentials
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const user = await prismaDB.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // compare passwords
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("An error occured", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      if (token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url);
    },
  },
  debug: process.env.NODE_ENV === "development",
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
