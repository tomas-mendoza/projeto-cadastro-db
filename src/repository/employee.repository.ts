import EntityNotFound from '../errors/EntityNotFound';
import Employee from '../models/Employee';
import Role from '../models/Role';
import roleRepository from './role.repository';

interface IEmployeeRepository {
  create(employee: Employee): Promise<Employee>;
  update(employee: Employee): Promise<Employee>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Employee[]>;
  getById(id: number): Promise<Employee>;
}

class EmployeeRepository implements IEmployeeRepository {
  async create(employee: Employee): Promise<Employee> {
    const { name, age, cpf, role_id } = employee;

    if(role_id) {
      await roleRepository.getById(role_id);
    }

    return await Employee.create({
      name,
      age,
      cpf,
      role_id
    });
  }

  async update(employee: Employee): Promise<Employee> {
    const { id, name, age, cpf, role_id } = employee;

    const newEmployee = await Employee.findByPk(id);

    if(!newEmployee) {
      throw new EntityNotFound('The employee was not found!');
    }

    newEmployee.name = name;
    newEmployee.age = age;
    newEmployee.cpf = cpf;

    if(role_id) {
      await roleRepository.getById(role_id);
    }

    newEmployee.role_id = role_id;

    return await newEmployee.save();
  }

  async delete(id: number): Promise<void> {
    const newEmployee = await Employee.findByPk(id, {
      include: {
        model: Role,
        as: 'role'
      },
      attributes: {
        exclude: ['role_id']
      }
    });

    if (!newEmployee) {
      throw new EntityNotFound('The employee was not found!');
    }

    await newEmployee.destroy();
  }

  async getAll(): Promise<Employee[]> {
    const employees = await Employee.findAll({
      include: {
        model: Role,
        as: 'role'
      },
      attributes: {
        exclude: ['role_id']
      }
    });

    return employees;
  }

  async getById(id: number): Promise<Employee> {
    const newEmployee = await Employee.findByPk(id);

    if(!newEmployee) {
      throw new EntityNotFound('The employee was not found!');
    }

    return newEmployee;
  }
}

export default new EmployeeRepository();
