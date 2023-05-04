-- CreateTable
CREATE TABLE `Todo` (
    `tid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Todo_tid_key`(`tid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `uid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `User_uid_key`(`uid`),
    UNIQUE INDEX `User_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
