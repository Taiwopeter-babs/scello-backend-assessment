import { UserRole } from "@src/shared";
import {
  Table,
  Column,
  PrimaryKey,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  Index,
  NotNull,
  Default,
  DataType,
} from "sequelize-typescript";

@Table({ tableName: "users" })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Column({ allowNull: false })
  firstName: string;

  @NotNull
  @Column({ allowNull: false })
  lastName: string;

  @Index
  @NotNull
  @Column({ allowNull: false })
  email: string;

  @NotNull
  @Column({ allowNull: false })
  password: string;

  @Default(UserRole.User)
  @NotNull
  @Column({ allowNull: false, type: DataType.ENUM(...Object.values(UserRole)) })
  role: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
