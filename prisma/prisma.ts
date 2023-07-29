import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/missing environment variable: "DATABASE_URL"');
}

let prisma: PrismaClient;

if (process.env.NODE_ENV == "development") {
  // In development mode use a global variable so the value is preserved across module reloads caused by HMR
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // dont use global variable in production
  prisma = new PrismaClient();
}

// export module scoped clientPromise
export default prisma;
