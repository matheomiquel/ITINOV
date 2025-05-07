import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Movie, MovieSort } from '../../shared/model/movies';
import { GetMovies } from '../../shared/store/shared.action';
import { SharedState } from '../../shared/store/shared.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatRadioModule, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, OnDestroy {
  private movies$: Observable<Movie[]> = inject(Store).select(SharedState.movies);
  private subscriptions: Subscription[] = [];
  
  public movieDataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>([]);
  public sort: MovieSort = "grade";
  public readonly displayColumns = ["name","releaseDate", "grade", "watched", "favorite" ];

  
  constructor(private readonly store: Store) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
  
  ngOnInit(): void {
    this.store.dispatch(new GetMovies(10, 0, this.sort));
    const moviesSubscription = this.movies$.subscribe((movies: Movie[]) => {
      console.log(movies)
      this.movieDataSource = new MatTableDataSource(movies);
    });
    this.subscriptions.push(moviesSubscription)
  }

  public changeSortingStrategy(sort: MovieSort){
    this.store.dispatch(new GetMovies(10, 0, sort));
  }
}
