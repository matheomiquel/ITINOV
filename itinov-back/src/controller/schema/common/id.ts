import { z } from "zod";

const idSchema = z.object({
  id: z.coerce.number({
    required_error: "Id should be a number",
    invalid_type_error: "Id should be a number"
  })
});

export { idSchema };
