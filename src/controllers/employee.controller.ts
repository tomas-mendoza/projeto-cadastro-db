import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Employee from '../models/Employee';
import employeeRepository from '../repository/employee.repository';

class EmployeeControler {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        age,
        cpf,
        role_id
      } = req.body;

      const newEmployee = new Employee({
        name,
        age,
        cpf,
        role_id: role_id ? role_id : null
      });

      const data = await employeeRepository.create(newEmployee);

      res.status(200).json({
        status: 'Created!',
        message: 'The employee has been created successfully!',
        data
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

  async update(req: Request, res: Response) {
    try {
      const {
        name,
        age,
        cpf,
        role_id
      } = req.body;      
      
      const newEmployee = new Employee({
        id: parseInt(req.params.id),
        name,
        age,
        cpf,
        role_id: role_id ? role_id : null
      });

      const data = await employeeRepository.update(newEmployee);

      res.status(200).json({
        status: 'Updated!',
        message: 'This employee has been updated successfully!',
        data
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
      await employeeRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This employee has been deleted successfully!'
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
      const employees = await employeeRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'The employees data has been fetched successfully!',
        employees
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
      const employee = await employeeRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This employee data has been fetched successfully!',
        employee
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

export default new EmployeeControler();
