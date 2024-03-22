import { AutoIncrement, Model, PrimaryKey, Unique, Column, Table, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Role from './Role';

@Table({
  tableName: 'Employees'
})
export default class Employee extends Model {

  @PrimaryKey
  @Unique
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  age!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(11))
  cpf!: string;

  @ForeignKey(() => Role)
  role_id!: number;

  @BelongsTo(() => Role)
  role!: Role;
}
