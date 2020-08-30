import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { getMovieQuery } from '../../queries/queries';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit, OnDestroy, OnChanges {
  movieId;
  movie;
  @Input('movieID')
  get movieID(): string {
    return;
  }
  set movieID(val: string) {
    this.movieId = val;
  }
  private movieQuerySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.movieId) {
      this.movieQuerySubscription = this.apollo
        .watchQuery<any>({
          query: getMovieQuery,
          variables: {
            id: this.movieId,
          },
        })
        .valueChanges.subscribe((result: any) => {
          this.movie = result.data && result.data.movie;
        });
    }
  }

  ngOnDestroy(): void {
    this.movieQuerySubscription.unsubscribe();
  }
}
