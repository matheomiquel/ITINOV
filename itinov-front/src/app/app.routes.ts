import { Routes } from '@angular/router';
import { MoviesComponent } from './movie/movies/movies.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { MovieComponent } from './movie/movie/movie.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authenticationGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [authenticationGuard()]
  },
  {
    path: 'movies/:id',
    component: MovieComponent
  },{
    path: '**',
    component: NotFoundComponent
  }
];
