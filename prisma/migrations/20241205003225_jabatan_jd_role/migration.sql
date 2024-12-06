/*
  Warnings:

  - You are about to drop the column `jabatan` on the `user` table. All the data in the column will be lost.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `jabatan`,
    ADD COLUMN `role` ENUM('siswa', 'admin') NOT NULL;
