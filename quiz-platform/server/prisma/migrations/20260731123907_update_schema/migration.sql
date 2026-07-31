/*
  Warnings:

  - A unique constraint covering the columns `[quizId,orderNumber]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "nickname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "QuizSession" ADD COLUMN     "questionStartedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Question_quizId_orderNumber_key" ON "Question"("quizId", "orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
