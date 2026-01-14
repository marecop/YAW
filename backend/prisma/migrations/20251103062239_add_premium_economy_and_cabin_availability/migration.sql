-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "airline" TEXT NOT NULL DEFAULT 'Yellow Airlines',
    "airlineCode" TEXT NOT NULL DEFAULT 'YA',
    "airlineLogo" TEXT,
    "from" TEXT NOT NULL,
    "fromCity" TEXT NOT NULL,
    "fromAirport" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "toCity" TEXT NOT NULL,
    "toAirport" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "aircraft" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "operatingDays" TEXT NOT NULL DEFAULT '1234567',
    "economyPrice" REAL NOT NULL,
    "premiumEconomyPrice" REAL NOT NULL DEFAULT 0,
    "businessPrice" REAL NOT NULL,
    "firstClassPrice" REAL NOT NULL,
    "economySeats" INTEGER NOT NULL,
    "premiumEconomySeats" INTEGER NOT NULL DEFAULT 0,
    "businessSeats" INTEGER NOT NULL,
    "firstClassSeats" INTEGER NOT NULL,
    "hasEconomy" BOOLEAN NOT NULL DEFAULT true,
    "hasPremiumEconomy" BOOLEAN NOT NULL DEFAULT false,
    "hasBusiness" BOOLEAN NOT NULL DEFAULT true,
    "hasFirstClass" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Flight" ("aircraft", "airline", "airlineCode", "airlineLogo", "arrivalTime", "businessPrice", "businessSeats", "createdAt", "departureTime", "duration", "economyPrice", "economySeats", "firstClassPrice", "firstClassSeats", "flightNumber", "from", "fromAirport", "fromCity", "id", "operatingDays", "status", "to", "toAirport", "toCity", "updatedAt") SELECT "aircraft", "airline", "airlineCode", "airlineLogo", "arrivalTime", "businessPrice", "businessSeats", "createdAt", "departureTime", "duration", "economyPrice", "economySeats", "firstClassPrice", "firstClassSeats", "flightNumber", "from", "fromAirport", "fromCity", "id", "operatingDays", "status", "to", "toAirport", "toCity", "updatedAt" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
