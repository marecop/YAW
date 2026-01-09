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
    "businessPrice" REAL NOT NULL,
    "firstClassPrice" REAL NOT NULL,
    "economySeats" INTEGER NOT NULL,
    "businessSeats" INTEGER NOT NULL,
    "firstClassSeats" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Flight" ("aircraft", "arrivalTime", "businessPrice", "businessSeats", "createdAt", "departureTime", "duration", "economyPrice", "economySeats", "firstClassPrice", "firstClassSeats", "flightNumber", "from", "fromAirport", "fromCity", "id", "operatingDays", "status", "to", "toAirport", "toCity", "updatedAt") SELECT "aircraft", "arrivalTime", "businessPrice", "businessSeats", "createdAt", "departureTime", "duration", "economyPrice", "economySeats", "firstClassPrice", "firstClassSeats", "flightNumber", "from", "fromAirport", "fromCity", "id", "operatingDays", "status", "to", "toAirport", "toCity", "updatedAt" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
