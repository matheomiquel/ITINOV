import { z } from "zod";

const patchSchema = z.object({ username: z.string({ required_error: "username is required" }) }).strict();

export { patchSchema };
