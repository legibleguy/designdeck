/*
  Warnings:

  - You are about to drop the column `complexity` on the `GameMechanic` table. All the data in the column will be lost.
  - Added the required column `category` to the `GameMechanic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examples` to the `GameMechanic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `GameMechanic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solvedProblems` to the `GameMechanic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeToImplementExplained` to the `GameMechanic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameMechanic" DROP COLUMN "complexity",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "examples" TEXT NOT NULL,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "solvedProblems" TEXT NOT NULL,
ADD COLUMN     "timeToImplementExplained" TEXT NOT NULL;
