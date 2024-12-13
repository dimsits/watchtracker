/*
  Warnings:

  - You are about to drop the column `rating` on the `watchlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `like_count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `watchlist` DROP COLUMN `rating`;

-- CreateTable
CREATE TABLE `Like` (
    `like_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `movie_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Like_user_id_movie_id_key`(`user_id`, `movie_id`),
    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movies`(`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;
