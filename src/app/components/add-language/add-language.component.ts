import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { addLanguageMutation, getLanguagesQuery } from '../../queries/queries';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
})
export class AddLanguageComponent implements OnInit {
  languageForm: FormGroup;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.languageForm = new FormGroup({
      nameControl: new FormControl(''),
    });
  }
  submitForm(event): void {
    event.preventDefault();
    this.apollo
      .mutate({
        mutation: addLanguageMutation,
        variables: {
          name: this.languageForm.get('nameControl').value,
        },
        refetchQueries: [{ query: getLanguagesQuery }],
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
