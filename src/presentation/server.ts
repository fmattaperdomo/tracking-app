import express, { Router } from 'express';
import { buildLogger } from "../presentation/plugins/logger.plugin";

interface Options{
  port?: number;
  routes: Router;
}

export class Server {
  private logger = buildLogger(Server.name);
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options ) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) ); 

    this.app.use( this.routes );

    this.app.listen(this.port, () => {
      this.logger.log(`Server running on port ${ this.port }`);
      console.log(`Server running on port ${ this.port }`);
    })

  }
}
