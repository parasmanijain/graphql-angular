import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { getMoviesQuery } from '../../queries/queries';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies = [];
  selected;
  private moviesQuerySubscription: Subscription;
  @Output() public movieSelected = new EventEmitter();
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.moviesQuerySubscription = this.apollo
      .watchQuery<any>({
        query: getMoviesQuery,
      })
      .valueChanges.subscribe((result: any) => {
        this.movies = result.data && result.data.movies;
      });
  }

  movieSelection(id): void {
    this.movieSelected.emit(id);
  }

  ngOnDestroy(): void {
    this.moviesQuerySubscription.unsubscribe();
  }
}
