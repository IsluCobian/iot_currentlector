-- CreateTable
CREATE TABLE "LectorEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "current" REAL NOT NULL,
    "power" REAL NOT NULL,
    "energy" REAL NOT NULL,
    "submitAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
