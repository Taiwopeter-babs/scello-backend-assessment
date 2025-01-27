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
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Index
  @NotNull
  @Column({ allowNull: false })
  name: string;

  @NotNull
  @Column({ allowNull: false })
  description: string;

  @Default(0)
  @Column
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
