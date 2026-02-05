import { envs } from "./configs/envs.config";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const { PORT: port, PUBLIC_PATH: publicPath } = envs();
  const server = new Server({ port, publicPath });
  await server.start();
}
