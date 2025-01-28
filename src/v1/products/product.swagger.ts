const Product = {
  Product: {
    allOf: [
      { $ref: "#/components/schemas/CommonParams" },
      { $ref: "#/components/schemas/ProductUpdate" },
    ],
  },

  ProductUpdate: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      stockQuantity: { type: "integer" },
      price: { type: "decimal" },
    },
  },

  // Object type to create a product
  ProductCreate: {
    allOf: [{ $ref: "#/components/schemas/ProductUpdate" }],

    required: ["name", "description", "category", "stockQuantity", "price"],
  },
};

export default Product;
