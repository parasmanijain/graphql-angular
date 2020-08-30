import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  addDirectorMutation,
  getCountriesQuery,
  getDirectorsQuery,
} from '../../queries/queries';
@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
})
export class AddDirectorComponent implements OnInit, OnDestroy {
  directorForm: FormGroup;
  countries = [];
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.directorForm = new FormGroup({
      nameControl: new FormControl(''),
      countryControl: new FormControl(''),
    });
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getCountriesQuery,
      })
      .valueChanges.subscribe((result: any) => {
        this.countries = result.data && result.data.countries;
      });
  }

  submitForm(event): void {
    event.preventDefault();
    this.apollo
      .mutate({
        mutation: addDirectorMutation,
        variables: {
          name: this.directorForm.get('nameControl').value,
          countryID: this.directorForm.get('countryControl').value,
        },
        refetchQueries: [{ query: getDirectorsQuery }],
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
    this.querySubscription.unsubscribe();
  }
}
