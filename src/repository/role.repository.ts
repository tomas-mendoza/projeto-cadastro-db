import EntityNotFound from '../errors/EntityNotFound';
import Role from '../models/Role';

interface IRoleRepository {
  create(role: Role): Promise<Role>;
  update(role: Role): Promise<Role>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Role[]>;
  getById(id: number): Promise<Role>;
}

class RoleRepository implements IRoleRepository {
  async create(role: Role): Promise<Role> {
    return await Role.create({
      description: role.description
    });
  }

  async update(role: Role): Promise<Role> {
    const { id, description } = role;

    const newRole = await Role.findByPk(id);

    if (!newRole) {
      throw new EntityNotFound('The role was not found!');
    }

    newRole.description = description;

    await newRole.save();

    return newRole;
  }

  async delete(id: number): Promise<void> {
    const newRole = await Role.findByPk(id);

    if (!newRole) {
      throw new EntityNotFound('The role was not found!');
    }

    newRole.destroy();
  }

  async getAll(): Promise<Role[]> {
    const roles = await Role.findAll();

    return roles;
  }

  async getById(id: number): Promise<Role> {
    const newRole = await Role.findByPk(id);

    if (!newRole) {
      throw new EntityNotFound('The role was not found!');
    }

    return newRole;
  }
}

export default new RoleRepository();
