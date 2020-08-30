import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  addMovieMutation,
  getGenresQuery,
  getDirectorsQuery,
  getLanguagesQuery,
  getMoviesQuery,
} from '../../queries/queries';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
})
export class AddMovieComponent implements OnInit, OnDestroy {
  movieForm: FormGroup;
  genres = [];
  languages = [];
  directors = [];
  private genreQuerySubscription: Subscription;
  private languageQuerySubscription: Subscription;
  private directorQuerySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      nameControl: new FormControl(''),
      yearControl: new FormControl(''),
      genreControl: new FormControl(''),
      languageControl: new FormControl(''),
      directorControl: new FormControl(''),
    });
    this.genreQuerySubscription = this.apollo
      .watchQuery<any>({
        query: getGenresQuery,
      })
      .valueChanges.subscribe((result: any) => {
        this.genres = result.data && result.data.genres;
      });
    this.languageQuerySubscription = this.apollo
      .watchQuery<any>({
        query: getLanguagesQuery,
      })
      .valueChanges.subscribe((result: any) => {
        this.languages = result.data && result.data.languages;
      });
    this.directorQuerySubscription = this.apollo
      .watchQuery<any>({
        query: getDirectorsQuery,
      })
      .valueChanges.subscribe((result: any) => {
        this.directors = result.data && result.data.directors;
      });
  }

  submitForm(event): void {
    event.preventDefault();
    this.apollo
      .mutate({
        mutation: addMovieMutation,
        variables: {
          name: this.movieForm.get('nameControl').value,
          year: this.movieForm.get('yearControl').value,
          genreID: this.movieForm.get('genreControl').value,
          languageID: this.movieForm.get('languageControl').value,
          directorID: this.movieForm.get('directorControl').value,
        },
        refetchQueries: [{ query: getMoviesQuery }],
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.genreQuerySubscription.unsubscribe();
    this.languageQuerySubscription.unsubscribe();
    this.directorQuerySubscription.unsubscribe();
  }
}
