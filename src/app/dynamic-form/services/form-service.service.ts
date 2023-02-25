import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DynamicForm } from '../models/DynamicForm.interface';

const exampleForms: DynamicForm[] = 
[
  {
    id: "ff6a2f1c-1ce2-4ffc-a018-171f28c99d6b",
    name: "My First Form",
    fields: [
      {
        id: "b95aa08b-c5de-4b3c-9968-a59d0c889d6c",
        order: 2,
        label: "First Name",
        fieldType: "text",
        placeholder: "Max",
        constraints: [
          {
            name: "minlength",
            value: "3",
            hint: "Your input is to short"
          },
          {
            name: "maxlength",
            value: "100",
            hint: "Your input is to long"
          },
          {
            name: "required",
            value: "true",
          }
        ]
      },
      {
        id: "2cd78bcd-5a8d-44ed-bb72-4f2d7fed7853",
        order: 1,
        label: "Last Name",
        fieldType: "text",
        placeholder: "Muster",
        constraints: [
          {
            name: "minlength",
            value: "3",
            hint: "Your input is to short"
          },
          {
            name: "maxlength",
            value: "100",
            hint: "Your input is to long"
          },
          {
            name: "required",
            value: "true"
          }
        ]
      },
      {
        id: "ef09aedc-ddc3-4d0b-91e7-b04219463ec9",
        order: 3,
        label: "Postal Code",
        fieldType: "number",
        defaultValue: "1010",
        constraints: [
          {
            name: "min",
            value: "1000"
          },
          {
            name: "max",
            value: "9999"
          },
          {
            name: "required",
            value: "true"
          }
        ],
        hint: "Only Austrian postal codes"
      },
      {
        id: "e449cb6f-abb3-4791-9c03-dc7e75d09213",
        order: 4,
        label: "Address",
        fieldType: "text",
        placeholder: "Mustergasse 123, 1010, Wien",
        constraints: [
          {
            name: "pattern",
            value: "^[\\w\\s]+,\\s?\\d+,\\s\\w+$",
            hint: "Your input doesn`t meet the pattern"
          }
        ],
        hint: "<Street> <Number>, <Postal Code>, <City>"
      }
    ]
  },
  {
    name: "Kontaktformular",
    fields: [
        {
            label: "Vorname",
            fieldType: "text",
            placeholder: "Max",
            constraints: [
                {
                    name: "required",
                    value: "true",
                    hint: "Pflichtfeld"
                }
            ],
            hint: null,
            id: "47105c30-0fb9-4d66-9278-456160a76776",
            order: 0
        },
        {
            label: "Nachname",
            fieldType: "text",
            defaultValue: null,
            placeholder: "Muster",
            constraints: [
                {
                    name: "required",
                    value: "true"
                }
            ],
            hint: null,
            id: "82eea341-6022-4c04-9960-ebd124879de2",
            order: 1
        },
        {
            label: "Geburtsdatum",
            fieldType: "date",
            defaultValue: "2023-01-01",
            placeholder: null,
            constraints: [
                {
                    name: "min",
                    value: "2023-02-25"
                }
            ],
            hint: null,
            id: "812fb8ac-b937-48be-90d4-23dc2a0d09f7",
            order: 2
        },
        {
            label: "Email",
            fieldType: "email",
            defaultValue: null,
            placeholder: "mail@domain.com",
            constraints: [],
            hint: null,
            id: "53922bb6-cad3-4aa2-ac20-ff79e764b69b",
            order: 3
        },
        {
            label: "PLZ",
            fieldType: "number",
            defaultValue: "1010",
            placeholder: null,
            constraints: [
                {
                    name: "max",
                    value: "1000",
                    hint: "Nur österreichische PLZ"
                },
                {
                    name: "min",
                    value: "9999",
                    hint: "Nur österreichische PLZ"
                }
            ],
            hint: null,
            id: "f74ca63e-ed80-407d-b36b-42d2224a4b55",
            order: 4
        }
    ],
    id: "88906f47-b02b-4992-922e-0c5d8670d2c0"
  }
]


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getDynamicForm(id: string): Observable<DynamicForm>
  {
    return of(exampleForms.filter(form => form.id === id)[0]);
  }

  saveDynamicForm(form: DynamicForm)
  {
    console.log(form);
  }
}
