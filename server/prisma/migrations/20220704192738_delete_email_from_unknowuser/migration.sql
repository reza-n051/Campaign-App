/*
  Warnings:

  - You are about to drop the column `email` on the `UnknownUser` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UnknownUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
INSERT INTO "new_UnknownUser" ("firstName", "id", "lastName", "phoneNumber") SELECT "firstName", "id", "lastName", "phoneNumber" FROM "UnknownUser";
DROP TABLE "UnknownUser";
ALTER TABLE "new_UnknownUser" RENAME TO "UnknownUser";
CREATE UNIQUE INDEX "UnknownUser_phoneNumber_key" ON "UnknownUser"("phoneNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
