-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "membershipLevel" TEXT NOT NULL DEFAULT 'SILVER',
    "points" INTEGER NOT NULL DEFAULT 0,
    "phone" TEXT,
    "dateOfBirth" DATETIME,
    "nationality" TEXT,
    "passportNumber" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "fromCity" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "toCity" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "aircraft" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "economyPrice" REAL NOT NULL,
    "businessPrice" REAL NOT NULL,
    "firstClassPrice" REAL NOT NULL,
    "economySeats" INTEGER NOT NULL,
    "businessSeats" INTEGER NOT NULL,
    "firstClassSeats" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleDe" TEXT,
    "titleEn" TEXT,
    "titleZhCn" TEXT,
    "titleZhHk" TEXT,
    "description" TEXT NOT NULL,
    "descDe" TEXT,
    "descEn" TEXT,
    "descZhCn" TEXT,
    "descZhHk" TEXT,
    "discount" REAL NOT NULL,
    "validFrom" DATETIME NOT NULL,
    "validUntil" DATETIME NOT NULL,
    "imageUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleDe" TEXT,
    "titleEn" TEXT,
    "titleZhCn" TEXT,
    "titleZhHk" TEXT,
    "content" TEXT NOT NULL,
    "contentDe" TEXT,
    "contentEn" TEXT,
    "contentZhCn" TEXT,
    "contentZhHk" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleDe" TEXT,
    "titleEn" TEXT,
    "titleZhCn" TEXT,
    "titleZhHk" TEXT,
    "description" TEXT NOT NULL,
    "descDe" TEXT,
    "descEn" TEXT,
    "descZhCn" TEXT,
    "descZhHk" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "subscribed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");
