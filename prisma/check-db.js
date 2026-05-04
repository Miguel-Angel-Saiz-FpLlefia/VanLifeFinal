const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const readDatabaseUrl = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  const content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const match = content.match(/^\s*DATABASE_URL\s*=\s*(.+)\s*$/m);
  if (!match) {
    return "";
  }

  return match[1].trim().replace(/^"|"$/g, "");
};

const databaseUrl =
  process.env.DATABASE_URL ||
  readDatabaseUrl(path.resolve(__dirname, "..", ".env.local")) ||
  readDatabaseUrl(path.resolve(__dirname, "..", ".env"));

if (!databaseUrl) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(new Pool({ connectionString: databaseUrl })),
});

async function main() {
  const campers = await prisma.camper.findMany({ select: { id: true } });
  console.log(
    "ids",
    campers.map((item) => item.id),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
