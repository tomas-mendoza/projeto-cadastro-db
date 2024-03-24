import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Role from '../models/Role';
import roleRepository from '../repository/role.repository';

class RoleController {
  async create(req: Request, res: Response) {
    try {
      const newRole = new Role({
        description: req.body.description
      });

      await roleRepository.create(newRole);

      return res.status(200).json({
        status: 'Created!',
        message: 'The role has been created successfully!'
      });
    } catch (err: unknown) {
      const { 
        code,
        status,
        message,
        errors
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const newRole = new Role({
        id: parseInt(req.params.id),
        description: req.body.description  
      });

      await roleRepository.update(newRole);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This role has been updated successfully!'
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors
      });
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
      await roleRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This role has been deleted successfully!'
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors
      });

    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const roles = await roleRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'The role data has been fetched successfully!',
        roles
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const role = await roleRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This role data has been fetched successfully!',
        role
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors
      });
    }
  }
}

export default new RoleController();
