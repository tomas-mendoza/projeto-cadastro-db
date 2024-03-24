import employeeController from '../controllers/employee.controller';
import validateSchema from '../middlewares/validate.schema';
import { createEmployeeSchema, getOrDeleteEmployeeSchema, updateEmployeeSchema } from '../schemas/employee.schema';
import BaseRouter from './base/base.router';

class EmployeeRouter extends BaseRouter {
  routes(): void {
    this.router.post('/create', validateSchema(createEmployeeSchema), employeeController.create);
    this.router.patch('/update/:id', validateSchema(updateEmployeeSchema), employeeController.update);
    this.router.delete('/delete/:id', validateSchema(getOrDeleteEmployeeSchema), employeeController.delete);
    this.router.get('/', employeeController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteEmployeeSchema), employeeController.getById);
  }
}

export default new EmployeeRouter().router;
