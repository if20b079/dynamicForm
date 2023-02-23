import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DynamicForm } from '../models/DynamicForm.interface';

const exampleForm: DynamicForm = {
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
}


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getDynamicForm(id: string): Observable<DynamicForm>
  {
    return of(exampleForm);
  }

  saveDynamicForm(form: DynamicForm)
  {
    console.log(form);
  }
}
