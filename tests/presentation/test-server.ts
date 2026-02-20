import { Server } from "../../src/presentation/server";
import { envs } from "../../src/configs/envs.config";
import { AppRoutes } from "../../src/presentation/routes";

const { PORT, POSTGRES_URL, PUBLIC_PATH } = envs();

export const testServer = new Server({
  port: PORT,
  publicPath: PUBLIC_PATH,
  routes: AppRoutes.routes,
});
