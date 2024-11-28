-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watchlist` (
    `watchlist_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `movie_id` VARCHAR(191) NOT NULL,
    `watched` BOOLEAN NOT NULL DEFAULT false,
    `rating` INTEGER NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`watchlist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movies` (
    `movie_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NULL,
    `writer` VARCHAR(191) NULL,
    `actors` VARCHAR(191) NULL,
    `plot` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `awards` VARCHAR(191) NULL,
    `poster_url` VARCHAR(191) NULL,
    `imdb_rating` DOUBLE NULL,

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movies`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
