/*
  Warnings:

  - The values [ready] on the enum `peminjaman_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `peminjaman` MODIFY `status` ENUM('dipinjam', 'dikembalikan') NOT NULL DEFAULT 'dipinjam';
