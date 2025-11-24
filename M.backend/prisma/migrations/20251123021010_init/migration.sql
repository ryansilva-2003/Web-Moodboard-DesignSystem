/*
  Warnings:

  - You are about to drop the column `images` on the `Board` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Image_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "colors" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Board" ("colors", "createdAt", "description", "id", "title", "userId") SELECT "colors", "createdAt", "description", "id", "title", "userId" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
