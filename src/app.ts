import { envs } from "./configs/envs.config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const { PORT: port, PUBLIC_PATH: publicPath } = envs();
  const server = new Server({ port, publicPath, routes: AppRoutes.routes });
  await server.start();
}
