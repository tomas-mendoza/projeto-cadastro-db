import EntityNotFound from '../errors/EntityNotFound';
import Employee from '../models/Employee';

interface IEmployeeRepository {
  create(employee: Employee): Promise<void>;
  update(employee: Employee): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Employee[]>;
  getById(id: number): Promise<Employee>;
}

class EmployeeRepository implements IEmployeeRepository {
  async create(employee: Employee): Promise<void> {
    const { name, age, cpf, role_id } = employee;

    await Employee.create({
      name,
      age,
      cpf,
      role_id
    });
  }

  async update(employee: Employee): Promise<void> {
    const { id, name, age, cpf, role_id } = employee;

    const newEmployee = await Employee.findByPk(id);

    if(!newEmployee) {
      throw new EntityNotFound('The employee was not found!');
    }

    newEmployee.name = name;
    newEmployee.age = age;
    newEmployee.cpf = cpf;
    newEmployee.role_id = role_id;

    await newEmployee.save();
  }

  async delete(id: number): Promise<void> {
    const newEmployee = await Employee.findByPk(id);

    if (!newEmployee) {
      throw new EntityNotFound('The employee was not found!');
    }

    await newEmployee.destroy();
  }

  async getAll(): Promise<Employee[]> {
    const employees = await Employee.findAll();

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
