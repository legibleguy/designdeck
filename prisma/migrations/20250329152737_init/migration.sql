-- CreateTable
CREATE TABLE "GameMechanic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minTimeToImplement" INTEGER NOT NULL,
    "maxTimeToImplement" INTEGER NOT NULL,
    "complexity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameMechanic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameMechanic_title_key" ON "GameMechanic"("title");
