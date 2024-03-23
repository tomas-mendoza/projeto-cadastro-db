import EntityNotFound from "../errors/EntityNotFound";
import errorHandler from "../helpers/error.handler";
import Role from "../models/Role";

interface IRoleRepository {
  create(role: Role): Promise<void>;
  update(role: Role): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Role[] | undefined>;
  getById(id: number): Promise<Role | undefined>;
}

class RoleRepository implements IRoleRepository {
  async create(role: Role): Promise<void> {
    try {
      await Role.create({
        description: role.description
      });
    } catch (err: unknown) {
      errorHandler(err);
    }
  }

  async update(role: Role): Promise<void> {
    try {
      const { id, description } = role;

      const newRole = await Role.findByPk(id);

      if (!newRole) {
        throw new EntityNotFound('The role was not found!');
      }

      newRole.description = description;

      newRole.save();
    } catch (err: unknown) {

    }
  }

  async delete(id: number): Promise<void> {
    try {
      const newRole = await Role.findByPk(id);

      if (!newRole) {
        throw new EntityNotFound('The role was not found!');
      }

      newRole.destroy();
    } catch (err: unknown) {
      errorHandler(err);
    }
  }

  async getAll(): Promise<Role[]> {
    try {
      const roles = await Role.findAll();

      return roles;
    } catch (err: unknown) {
      errorHandler(err);
    }
  }

  async getById(id: number): Promise<Role> {
    try {
      const newRole = await Role.findByPk(id);

      if (!newRole) {
        throw new EntityNotFound('The role was not found!');
      }

      return newRole;
    } catch (err: unknown) {
      errorHandler(err);
    }
  }
}

export default new RoleRepository();
