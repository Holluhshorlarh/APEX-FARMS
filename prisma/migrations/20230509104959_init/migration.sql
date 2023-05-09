-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('users', 'admin');

-- CreateEnum
CREATE TYPE "categories" AS ENUM ('vegetables', 'fruits', 'beef', 'poultry', 'fishery', 'cereals', 'others');

-- CreateTable
CREATE TABLE "person" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "role_enum" NOT NULL DEFAULT 'users',

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "category" "categories" NOT NULL DEFAULT 'others',
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_review" (
    "id" TEXT NOT NULL,
    "likes" BOOLEAN NOT NULL DEFAULT false,
    "review" TEXT,
    "product_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "product_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "person_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_review_product_id_key" ON "product_review"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_review_person_id_key" ON "product_review"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_product_id_key" ON "cart"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_person_id_key" ON "cart"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_person_id_key" ON "orders"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_product_id_key" ON "orders"("product_id");

-- AddForeignKey
ALTER TABLE "product_review" ADD CONSTRAINT "product_review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_review" ADD CONSTRAINT "product_review_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
