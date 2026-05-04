const fs = require("fs");
const path = require("path");

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const [rawKey, ...rest] = trimmed.split("=");
    if (!rawKey || rest.length === 0) {
      continue;
    }

    const key = rawKey.replace(/^\uFEFF/, "");
    const rawValue = rest.join("=").trim();
    const value = rawValue.replace(/^"|"$/g, "");
    if (key === "DATABASE_URL" || !process.env[key]) {
      process.env[key] = value;
    }
  }
};

const envLocalPath = path.resolve(__dirname, "..", ".env.local");
const envPath = path.resolve(__dirname, "..", ".env");

loadEnvFile(envLocalPath);
loadEnvFile(envPath);

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
  readDatabaseUrl(envLocalPath) ||
  readDatabaseUrl(envPath);

if (!databaseUrl) {
  console.error("DATABASE_URL is not set for seed.");
}

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const campers = [
  {
    id: "cliff-640",
    name: "Sunlight Cliff 640",
    tagline: "Compacta, luminosa y lista para la costa.",
    pricePerDay: 120,
    sleep: 4,
    seats: 4,
    transmission: "Manual",
    location: "Barcelona",
    rating: 4.8,
    reviews: 214,
    features: ["Cocina", "Ducha", "WC", "GPS"],
    accent: "from-amber-400/40 via-slate-900/60 to-emerald-700/40",
  },
  {
    id: "california",
    name: "Volkswagen California",
    tagline: "Iconica, agil y perfecta para escapadas rapidas.",
    pricePerDay: 150,
    sleep: 4,
    seats: 5,
    transmission: "Auto",
    location: "Girona",
    rating: 4.9,
    reviews: 178,
    features: ["Techo elevable", "Cocina", "Clima", "Audio"],
    accent: "from-cyan-400/40 via-slate-900/60 to-sky-700/40",
  },
  {
    id: "transit-custom",
    name: "Ford Transit Custom",
    tagline: "Amplia, moderna y con confort premium.",
    pricePerDay: 110,
    sleep: 3,
    seats: 4,
    transmission: "Manual",
    location: "Tarragona",
    rating: 4.7,
    reviews: 156,
    features: ["Cocina", "Frigorifico", "Ducha", "Bluetooth"],
    accent: "from-rose-400/40 via-slate-900/60 to-orange-600/40",
  },
  {
    id: "grand-canyon",
    name: "Hymer Grand Canyon",
    tagline: "Estilo alpino con espacio para largos viajes.",
    pricePerDay: 180,
    sleep: 4,
    seats: 4,
    transmission: "Auto",
    location: "Andorra",
    rating: 4.9,
    reviews: 98,
    features: ["Cama king", "Calefaccion", "Panel solar", "Ducha"],
    accent: "from-violet-400/40 via-slate-900/60 to-indigo-700/40",
  },
  {
    id: "nomad-pro",
    name: "Nomad Pro 540",
    tagline: "Aventura ligera con todo lo esencial.",
    pricePerDay: 95,
    sleep: 2,
    seats: 2,
    transmission: "Manual",
    location: "Valencia",
    rating: 4.6,
    reviews: 121,
    features: ["Cocina", "Ducha exterior", "Toldo", "USB"],
    accent: "from-lime-400/40 via-slate-900/60 to-emerald-700/40",
  },
  {
    id: "atlas-x",
    name: "Atlas Xplorer",
    tagline: "Diseno robusto para rutas largas y frias.",
    pricePerDay: 165,
    sleep: 4,
    seats: 4,
    transmission: "Auto",
    location: "Bilbao",
    rating: 4.8,
    reviews: 87,
    features: ["4x4", "Calefaccion", "Cocina", "Agua caliente"],
    accent: "from-sky-400/40 via-slate-900/60 to-cyan-700/40",
  },
];

async function main() {
  for (const camper of campers) {
    await prisma.camper.upsert({
      where: { id: camper.id },
      update: camper,
      create: camper,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
