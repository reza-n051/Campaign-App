-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KarzarSign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "unknownUserId" INTEGER,
    "karzarId" TEXT NOT NULL,
    CONSTRAINT "KarzarSign_karzarId_fkey" FOREIGN KEY ("karzarId") REFERENCES "Karzar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KarzarSign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "KarzarSign_unknownUserId_fkey" FOREIGN KEY ("unknownUserId") REFERENCES "UnknownUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_KarzarSign" ("id", "karzarId", "unknownUserId", "userId") SELECT "id", "karzarId", "unknownUserId", "userId" FROM "KarzarSign";
DROP TABLE "KarzarSign";
ALTER TABLE "new_KarzarSign" RENAME TO "KarzarSign";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
