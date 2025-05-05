export const PATH = { USER: "user" };

export const CONSTANT = {
  REGISTER: "register" as const,
  USER: "user" as const,
  LOGIN: "login" as const,
  ID: ":id" as const,
  MOVIE: "movie" as const
};

export const ENDPOINT = {
  REGISTER: `/${CONSTANT.REGISTER}` as const,
  USER: `/${CONSTANT.USER}` as const,
  LOGIN: `/${CONSTANT.LOGIN}` as const,
  MOVIE: `/${CONSTANT.MOVIE}` as const,
  MOVIE_BY_ID: `/${CONSTANT.MOVIE}/${CONSTANT.ID}` as const,
  ADD_MOVIE_TO_WATCHED: `/${CONSTANT.MOVIE}/${CONSTANT.ID}/watched` as const
};
