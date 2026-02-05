import express from "express";
import path from "path";

interface Options {
  port: number;
  publicPath: string;
}
export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;

  constructor({ port, publicPath }: Options) {
    this.port = port;
    this.publicPath = publicPath;
  }

  async start() {
    this.app.use(express.static("public"));

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
