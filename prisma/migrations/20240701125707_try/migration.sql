-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dope" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Dope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dopelist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Dopelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DopeToDopelist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DopeToDopelist_AB_unique" ON "_DopeToDopelist"("A", "B");

-- CreateIndex
CREATE INDEX "_DopeToDopelist_B_index" ON "_DopeToDopelist"("B");

-- AddForeignKey
ALTER TABLE "Dope" ADD CONSTRAINT "Dope_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dopelist" ADD CONSTRAINT "Dopelist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DopeToDopelist" ADD CONSTRAINT "_DopeToDopelist_A_fkey" FOREIGN KEY ("A") REFERENCES "Dope"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DopeToDopelist" ADD CONSTRAINT "_DopeToDopelist_B_fkey" FOREIGN KEY ("B") REFERENCES "Dopelist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
