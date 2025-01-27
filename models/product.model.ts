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
} from "sequelize-typescript";

@Table({ tableName: "products" })
export class Product extends Model {
  @Column
  @PrimaryKey
  @AutoIncrement
  id: string;

  @Column
  @Index
  @NotNull
  name: string;

  @Column
  @NotNull
  description: string;

  @Column
  @Default(0)
  price: number;

  @Column
  stockQuantity: number;

  @Column
  category: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
