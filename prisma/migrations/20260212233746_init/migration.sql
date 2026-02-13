-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
