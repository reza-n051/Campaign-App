/*
  Warnings:

  - You are about to drop the `Signer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Signer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "KarzarSign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "unknownUserId" INTEGER NOT NULL,
    "karzarId" INTEGER NOT NULL,
    CONSTRAINT "KarzarSign_karzarId_fkey" FOREIGN KEY ("karzarId") REFERENCES "Karzar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KarzarSign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KarzarSign_unknownUserId_fkey" FOREIGN KEY ("unknownUserId") REFERENCES "UnknownUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
