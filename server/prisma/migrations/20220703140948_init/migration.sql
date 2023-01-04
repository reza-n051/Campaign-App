-- CreateTable
CREATE TABLE "Karzar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedTime" DATETIME NOT NULL,
    "creatorId" INTEGER NOT NULL,
    CONSTRAINT "Karzar_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UnknownUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Signer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "unknownUserId" INTEGER NOT NULL,
    CONSTRAINT "Signer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Signer_unknownUserId_fkey" FOREIGN KEY ("unknownUserId") REFERENCES "UnknownUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LoginInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastAttempt" DATETIME NOT NULL,
    "lastLogin" DATETIME NOT NULL,
    "attemtCountInPeriod" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "LoginInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Karzar_creatorId_key" ON "Karzar"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UnknownUser_email_key" ON "UnknownUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UnknownUser_phoneNumber_key" ON "UnknownUser"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Signer_userId_key" ON "Signer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Signer_unknownUserId_key" ON "Signer"("unknownUserId");

-- CreateIndex
CREATE UNIQUE INDEX "LoginInfo_userId_key" ON "LoginInfo"("userId");
