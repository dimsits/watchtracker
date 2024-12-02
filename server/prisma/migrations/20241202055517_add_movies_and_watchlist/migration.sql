/*
  Warnings:

  - Made the column `director` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `writer` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `actors` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plot` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `awards` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poster_url` on table `movies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imdb_rating` on table `movies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_user_id_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `movies` MODIFY `year` VARCHAR(191) NOT NULL,
    MODIFY `director` VARCHAR(191) NOT NULL,
    MODIFY `writer` VARCHAR(191) NOT NULL,
    MODIFY `actors` VARCHAR(191) NOT NULL,
    MODIFY `plot` VARCHAR(191) NOT NULL,
    MODIFY `language` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NOT NULL,
    MODIFY `awards` VARCHAR(191) NOT NULL,
    MODIFY `poster_url` VARCHAR(191) NOT NULL,
    MODIFY `imdb_rating` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movies`(`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;
