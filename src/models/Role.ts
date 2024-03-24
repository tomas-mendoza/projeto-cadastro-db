import { AutoIncrement, Model, PrimaryKey, Unique, Column, Table, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import Employee from './Employee';

@Table({
  tableName: 'Roles'
})
export default class Role extends Model {

  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
    id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
    description!: string;

  @HasMany(() => Employee)
    employees!: Employee[];
}
