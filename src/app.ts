import Express, { Application } from 'express';
import Database from './config/database';
import roleRouter from './routers/role.router';
import employeeRouter from './routers/employee.router';

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
    this.app.use('/roles', roleRouter);
    this.app.use('/employees', employeeRouter);
  }

  protected async connectDatabase(): Promise<void> {
    const database = new Database();
    await database.connect();
  }
}

export default new App().app;
