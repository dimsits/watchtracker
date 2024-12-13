/*
  Warnings:

  - You are about to drop the column `like_count` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_user_id_fkey`;

-- AlterTable
ALTER TABLE `movies` DROP COLUMN `like_count`;

-- DropTable
DROP TABLE `like`;

-- CreateTable
CREATE TABLE `Review` (
    `review_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `movie_id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Review_user_id_movie_id_key`(`user_id`, `movie_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movies`(`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;
