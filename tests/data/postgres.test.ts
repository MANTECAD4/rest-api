import { describe, expect, test, vi } from "vitest";
import { prismaClient } from "../../src/data/postgres";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

vi.mock("../../src/generated/prisma/client", async (importOriginal) => {
  return {
    PrismaClient: vi.fn(),
  };
});

describe("Postgres client Instance", () => {
  test("should return an instance of Prisma Client", () => {
    expect(prismaClient).toBeInstanceOf(PrismaClient);
    expect(PrismaClient).toHaveBeenCalledWith(
      expect.objectContaining({
        adapter: expect.any(PrismaPg),
      }),
    );
  });
});
