import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AddGenreComponent } from './components/add-genre/add-genre.component';
import { AddLanguageComponent } from './components/add-language/add-language.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddDirectorComponent } from './components/add-director/add-director.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGenreComponent,
    AddLanguageComponent,
    AddCountryComponent,
    AddMovieComponent,
    AddDirectorComponent,
    MovieDetailsComponent,
    MovieListComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
