import { PrismaPg } from "@prisma/adapter-pg";
import { DefaultArgs } from "@prisma/client/runtime/client";
import { envs } from "../configs/envs.config.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { GlobalOmitConfig } from "../generated/prisma/internal/prismaNamespace.js";

const { POSTGRES_URL: postgresUrl } = envs();
const adapter = new PrismaPg({ connectionString: postgresUrl });
export const prismaClient: PrismaClient<
  never,
  GlobalOmitConfig | undefined,
  DefaultArgs
> = new PrismaClient({
  adapter,
});
