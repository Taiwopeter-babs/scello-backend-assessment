import zod from "zod";

export const createUserSchema = zod.object({
  firstName: zod.string({ message: "First name is required" }),
  lastName: zod.string({ message: "Last name is required" }),
  email: zod.string({ message: "Email is required" }).email({ message: "Invalid email" }),
  password: zod.string({ message: "Password is required" }),
});

export const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  role: zod.enum(["User", "Admin"], {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_enum_value":
          return { message: `Supported values are ${["User", "Admin"].join(", ")}` };
        case "invalid_type":
          return { message: "Invalid type" };
        default:
          return { message: "Unsupported visibility" };
      }
    },
  }),
});
