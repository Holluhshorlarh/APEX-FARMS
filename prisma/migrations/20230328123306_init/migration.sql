-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('vegetables', 'fruits', 'beef', 'poultry', 'fishery', 'cereals', 'others');

-- CreateTable
CREATE TABLE "person" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'others',
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "likes" BOOLEAN NOT NULL DEFAULT false,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "person_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_person_id_key" ON "product"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_person_id_key" ON "order"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_product_id_key" ON "order"("product_id");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
