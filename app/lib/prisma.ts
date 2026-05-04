import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";
import { Pool } from "pg";

type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as PrismaGlobal;

const readDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const root = process.cwd();
  const envPaths = [path.join(root, ".env.local"), path.join(root, ".env")];

  for (const envPath of envPaths) {
    if (!fs.existsSync(envPath)) {
      continue;
    }

    const content = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
    const match = content.match(/^\s*DATABASE_URL\s*=\s*(.+)\s*$/m);
    if (match) {
      const value = match[1].trim().replace(/^"|"$/g, "");
      process.env.DATABASE_URL = value;
      return value;
    }
  }

  return undefined;
};

const databaseUrl = readDatabaseUrl();

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Check .env.local or .env.");
}

const pool = new Pool({
  connectionString: databaseUrl,
});

const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
