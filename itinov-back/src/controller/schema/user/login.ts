import { z } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "email is required" }).email({ message: "not an email" }),
  password: z.string({ required_error: "password is required" })
}).strict();

export { loginSchema };
