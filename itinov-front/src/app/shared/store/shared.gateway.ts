import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ENDPOINT } from "../config/endpoint";
import { LoginData } from "../model/user";
import { GetMovies } from "./shared.action";
import { Movie } from "../model/movies";

@Injectable({ providedIn: "root" })
export class SharedGateway {
  constructor(private readonly httpClient: HttpClient) { }

  login({ email, password }: { email: string, password: string }): Observable<LoginData> {
    return this.httpClient.post<LoginData>(ENDPOINT.LOGIN, { email, password });
  }

  getMovies(payload: GetMovies): Observable<Movie[]> {
    const params = {
      limit: payload.limit,
      offset: payload.offset,
      sort: payload.sort
    };
    return this.httpClient.get<Movie[]>(ENDPOINT.MOVIE, {
      params
    });
  }
}