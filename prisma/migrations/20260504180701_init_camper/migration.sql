-- CreateTable
CREATE TABLE "Camper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "sleep" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "features" TEXT[],
    "accent" TEXT NOT NULL,

    CONSTRAINT "Camper_pkey" PRIMARY KEY ("id")
);
