import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prismaDB: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    // dont use global variable in production
    prismaDB = new PrismaClient();
  } else {
    // In development mode use a global variable so the value is preserved across module reloads caused by HMR
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }

    prismaDB = global.prisma;
  }
}

// export module scoped clientPromise
//@ts-ignore
export default prismaDB;
