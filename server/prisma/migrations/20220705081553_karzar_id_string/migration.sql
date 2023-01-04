/*
  Warnings:

  - The primary key for the `Karzar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KarzarSign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "unknownUserId" INTEGER NOT NULL,
    "karzarId" TEXT NOT NULL,
    CONSTRAINT "KarzarSign_karzarId_fkey" FOREIGN KEY ("karzarId") REFERENCES "Karzar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KarzarSign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KarzarSign_unknownUserId_fkey" FOREIGN KEY ("unknownUserId") REFERENCES "UnknownUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_KarzarSign" ("id", "karzarId", "unknownUserId", "userId") SELECT "id", "karzarId", "unknownUserId", "userId" FROM "KarzarSign";
DROP TABLE "KarzarSign";
ALTER TABLE "new_KarzarSign" RENAME TO "KarzarSign";
CREATE TABLE "new_Karzar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedTime" DATETIME,
    "creatorId" INTEGER NOT NULL,
    CONSTRAINT "Karzar_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Karzar" ("acceptedTime", "createTime", "creatorId", "id", "imgSrc", "isAccepted", "isActive", "name", "text") SELECT "acceptedTime", "createTime", "creatorId", "id", "imgSrc", "isAccepted", "isActive", "name", "text" FROM "Karzar";
DROP TABLE "Karzar";
ALTER TABLE "new_Karzar" RENAME TO "Karzar";
CREATE UNIQUE INDEX "Karzar_creatorId_key" ON "Karzar"("creatorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
