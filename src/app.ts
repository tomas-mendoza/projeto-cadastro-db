import Express, { Application } from 'express';
import Database from './config/database';

class App {
  public app: Application;

  constructor() {
    this.app = Express();
    this.plugins();
    this.routes();
    this.connectDatabase();
  }

  protected plugins(): void {
    this.app.use(Express.json());
  }

  protected routes(): void {
    this.app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));
  }

  protected async connectDatabase(): Promise<void> {
    const database = new Database();
    await database.connect();
  }
}

export default new App().app;
