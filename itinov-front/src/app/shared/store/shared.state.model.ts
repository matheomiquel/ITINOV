import { Movie } from "../model/movies"

export interface SharedStateModel {
  username: string,
  movies: Movie[]
}

export const DEFAULT_SHARED_STATE: SharedStateModel = {
  username: "",
  movies: []
}