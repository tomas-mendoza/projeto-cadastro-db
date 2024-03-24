import { Router } from 'express';


interface IBaseRouter {
  routes(): void;
}

export default abstract class BaseRouter implements IBaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}
