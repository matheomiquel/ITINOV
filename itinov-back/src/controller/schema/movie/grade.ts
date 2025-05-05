import { z } from "zod";
const gradeSortchema = z.object({
  grade: z.number({ message: "grade is required" })
    .max(10, { message: "grade can't be more than 10" })
    .min(0, { message: "grade can't be less than 0" })
});

export { gradeSortchema };
