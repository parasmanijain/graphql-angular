import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { addGenreMutation, getGenresQuery } from '../../queries/queries';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
})
export class AddGenreComponent implements OnInit {
  genreForm: FormGroup;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.genreForm = new FormGroup({
      nameControl: new FormControl(''),
    });
  }
  submitForm(event): void {
    event.preventDefault();
    this.apollo
      .mutate({
        mutation: addGenreMutation,
        variables: {
          name: this.genreForm.get('nameControl').value,
        },
        refetchQueries: [{ query: getGenresQuery }],
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
}
