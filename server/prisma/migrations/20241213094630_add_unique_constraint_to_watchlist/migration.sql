/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Watchlist_user_id_movie_id_key` ON `Watchlist`(`user_id`, `movie_id`);
