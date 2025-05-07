import { MovieSort } from "../model/movies";

export class Login {
  static type = "[Shared] login user";

  constructor(public email: string, public password: string) {

  }
}

export class GetMovies {
  static type = "[Movies] get movies";
  constructor(public limit: number, public offset: number, public sort: MovieSort) {

  }
}