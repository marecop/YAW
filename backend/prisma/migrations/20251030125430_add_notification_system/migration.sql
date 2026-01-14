-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "titleDe" TEXT,
    "titleEn" TEXT,
    "titleZhCn" TEXT,
    "titleZhHk" TEXT,
    "messageDe" TEXT,
    "messageEn" TEXT,
    "messageZhCn" TEXT,
    "messageZhHk" TEXT,
    "recipientType" TEXT NOT NULL,
    "recipientUserId" TEXT,
    "relatedType" TEXT,
    "relatedId" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "icon" TEXT,
    "link" TEXT,
    "senderId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME
);

-- CreateTable
CREATE TABLE "NotificationRead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NotificationRead_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationRead_notificationId_userId_key" ON "NotificationRead"("notificationId", "userId");
