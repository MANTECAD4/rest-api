import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}
export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor({ port, publicPath, routes }: Options) {
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());

    this.app.use(express.static("public"));

    this.app.use(this.routes);

    // SPA - sirve los archivos al recargar
    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}...`);
    });
  }
}
