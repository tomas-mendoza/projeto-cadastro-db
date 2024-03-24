import roleController from '../controllers/role.controller';
import validateSchema from '../middlewares/validate.schema';
import { createRoleSchema, getOrDeleteRoleSchema, updateRoleSchema } from '../schemas/role.schema';
import BaseRouter from './base/base.router';

class RoleRouter extends BaseRouter {
  routes(): void {
    this.router.post('/create', validateSchema(createRoleSchema), roleController.create);
    this.router.patch('/update/:id', validateSchema(updateRoleSchema), roleController.update);
    this.router.delete('/delete/:id', validateSchema(getOrDeleteRoleSchema), roleController.delete);
    this.router.get('/', roleController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteRoleSchema), roleController.getById);
  }
}

export default new RoleRouter().router;
