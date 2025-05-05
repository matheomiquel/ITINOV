import { z } from "zod";
const movieSortchema = z.object({
  sort: z.enum([
    "releaseDate",
    "grade"
  ], { message: "sorting strategy is required" })
});

export { movieSortchema };
