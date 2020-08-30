import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { addCountryMutation, getCountriesQuery } from '../../queries/queries';
@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
})
export class AddCountryComponent implements OnInit {
  countryForm: FormGroup;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.countryForm = new FormGroup({
      nameControl: new FormControl(''),
    });
  }
  submitForm(event): void {
    event.preventDefault();
    this.apollo
      .mutate({
        mutation: addCountryMutation,
        variables: {
          name: this.countryForm.get('nameControl').value,
        },
        refetchQueries: [{ query: getCountriesQuery }],
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
