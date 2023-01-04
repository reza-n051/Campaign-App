-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Karzar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
