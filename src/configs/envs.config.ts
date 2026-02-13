import "dotenv/config";

import env from "env-var";

export const envs = () => ({
  PORT: env.get("PORT").required().asPortNumber(),
  PUBLIC_PATH: env.get("PUBLIC_PATH").required().default("public").asString(),

  POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
});
