import zod from "zod";

export const createProductSchema = zod.object({
  name: zod.string({ message: "Name is required" }),
  description: zod.string({ message: "Description is required" }),
  price: zod.number({ message: "Price is required" }).min(1),
  stockQuantity: zod.number({ message: "Stock Quantity is required" }),
  category: zod.string({ message: "Category is required" }),
});

export const updateProductSchema = zod.object({
  name: zod.string().optional(),
  description: zod.string().optional(),
  price: zod.number().min(1).optional(),
  stockQuantity: zod.number().optional(),
  category: zod.string().optional(),
});
