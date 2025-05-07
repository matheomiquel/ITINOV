import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { GetMovies, Login } from './shared.action';
import { SharedGateway } from './shared.gateway';
import { DEFAULT_SHARED_STATE, SharedStateModel } from './shared.state.model';
import { Movie } from '../model/movies';


@State<SharedStateModel>({
  name: 'shared',
  defaults: DEFAULT_SHARED_STATE
})
@Injectable({ providedIn: "root" })
export class SharedState {

  constructor(private readonly sharedGateway: SharedGateway) {

  }

  @Selector()
  static movies(sharedStateModel: SharedStateModel): Movie[] {
    return sharedStateModel.movies;
  }

  @Action(Login)
  login(ctx: StateContext<SharedStateModel>, payload: Login) {
    return this.sharedGateway.login(payload).pipe(tap(
      (loginData) => {
        localStorage.setItem("token", loginData.token);
      }
    ));
  }

  @Action(GetMovies)
  getMovies(ctx: StateContext<SharedStateModel>, payload: GetMovies) {
    return this.sharedGateway.getMovies(payload).pipe(tap((movies: Movie[]) => {
      ctx.patchState({
        movies
      })
    }))
  }
}