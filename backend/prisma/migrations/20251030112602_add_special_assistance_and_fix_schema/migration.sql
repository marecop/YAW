/*
  Warnings:

  - Added the required column `flightDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromAirport` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAirport` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SpecialAssistanceRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "passengerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bookingNumber" TEXT,
    "flightNumber" TEXT,
    "flightDate" TEXT,
    "details" TEXT NOT NULL,
    "attachments" TEXT,
    "notes" TEXT,
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "flightDate" DATETIME NOT NULL,
    "passengerName" TEXT NOT NULL,
    "passengerEmail" TEXT NOT NULL,
    "passengerPhone" TEXT NOT NULL,
    "passportNumber" TEXT,
    "cabinClass" TEXT NOT NULL,
    "seatNumber" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "totalPrice" REAL NOT NULL,
    "specialMeal" TEXT,
    "extraBaggage" INTEGER NOT NULL DEFAULT 0,
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Booking_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("bookingNumber", "cabinClass", "checkedIn", "createdAt", "extraBaggage", "flightId", "id", "passengerEmail", "passengerName", "passengerPhone", "passportNumber", "seatNumber", "specialMeal", "status", "totalPrice", "updatedAt", "userId") SELECT "bookingNumber", "cabinClass", "checkedIn", "createdAt", "extraBaggage", "flightId", "id", "passengerEmail", "passengerName", "passengerPhone", "passportNumber", "seatNumber", "specialMeal", "status", "totalPrice", "updatedAt", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");
CREATE TABLE "new_Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
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
INSERT INTO "new_Flight" ("aircraft", "arrivalTime", "businessPrice", "businessSeats", "createdAt", "departureTime", "duration", "economyPrice", "economySeats", "firstClassPrice", "firstClassSeats", "flightNumber", "from", "fromCity", "id", "status", "to", "toCity", "updatedAt") SELECT "aircraft", "arrivalTime", "businessPrice", "businessSeats", "createdAt", "departureTime", "duration", "economyPrice", "economySeats", "firstClassPrice", "firstClassSeats", "flightNumber", "from", "fromCity", "id", "status", "to", "toCity", "updatedAt" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "SpecialAssistanceRequest_requestNumber_key" ON "SpecialAssistanceRequest"("requestNumber");
