import { envs } from "./configs/envs.config.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

(async () => {
  main();
})();

async function main() {
  const { PORT: port, PUBLIC_PATH: publicPath } = envs();
  const server = new Server({ port, publicPath, routes: AppRoutes.routes });
  await server.start();
}
