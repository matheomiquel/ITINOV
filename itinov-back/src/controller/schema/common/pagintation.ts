import { z } from "zod";

const paginationSchema = z.object({
  limit: z.coerce.number({
    required_error: "Limit should be a number",
    invalid_type_error: "Limit should be a number"
  }),
  offset: z.coerce.number({
    required_error: "Offset should be a number ",
    invalid_type_error: "Offset should be a number"
  })
});

export { paginationSchema };
