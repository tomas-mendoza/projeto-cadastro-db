import Employee from "../models/Employee";

interface IEmployeeRepository {
  create(employee: Employee): Promise<void>;
  update(employee: Employee): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Employee[]>;
  getById(id: number): Promise<Employee>;
}

class EmployeeRepository implements IEmployeeRepository {
  async create(employee: Employee): Promise<void> {
    try {
      const { name, age, cpf, role_id } = employee;

      await Employee.create({
        name,
        age,
        cpf,
        role_id
      });
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }

  async update(employee: Employee): Promise<void> {
    try {
      const { id, name, age, cpf, role_id } = employee;

      const newEmployee = await Employee.findByPk(id);

      if (!newEmployee) {
        throw new Error('The employee was not found!');
      }

      newEmployee.name = name;
      newEmployee.age = age;
      newEmployee.cpf = cpf;
      newEmployee.role_id = role_id;

      await newEmployee.save();
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newEmployee = await Employee.findByPk(id);

      if (!newEmployee) {
        throw new Error('The employee was not found!');
      }

      await newEmployee.destroy();
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }

  async getAll(): Promise<Employee[]> {
    try {
      const employees = await Employee.findAll();

      return employees;
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }

  async getById(id: number): Promise<Employee> {
    try {
      const newEmployee = await Employee.findByPk(id);

      if (!newEmployee) {
        throw new Error(`The employee was not found!`);
      }

      return newEmployee;
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }
}

export default new EmployeeRepository();
