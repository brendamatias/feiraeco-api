-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fair_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "unity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_products" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "unity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "product_id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchases_name_fair_id_key" ON "purchases"("name", "fair_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_user_id_key" ON "products"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_products_purchase_id_product_id_key" ON "purchase_products"("purchase_id", "product_id");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_fair_id_fkey" FOREIGN KEY ("fair_id") REFERENCES "fairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_products" ADD CONSTRAINT "purchase_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_products" ADD CONSTRAINT "purchase_products_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
