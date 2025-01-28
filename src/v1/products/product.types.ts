import { RequestQuery } from "@src/shared";

export type ProductCreate = {
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  name: string;
};

export type ProductUpdate = Partial<{
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  name: string;
}>;

export type Product = ProductCreate & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductQuery = RequestQuery & {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  sortName?: "asc" | "desc";
  sortPrice?: "asc" | "desc";
  sortStockQuantity?: "asc" | "desc";
};
