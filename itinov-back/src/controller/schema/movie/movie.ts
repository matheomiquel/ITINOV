import { z } from "zod";
const createMovieSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  releaseDate: z.string({ required_error: "releaseDate is required" }).date()
}).strict();

export { createMovieSchema };
