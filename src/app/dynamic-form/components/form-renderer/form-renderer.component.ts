import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ConstraintName } from '../../models/ConstraintName.type';
import { DynamicForm } from '../../models/DynamicForm.interface';
import { FieldConstraint } from '../../models/FieldConstraint.interface';
import { FormField } from '../../models/FormField.interface';
import { FormService } from '../../services/form-service.service';

import { validate as uuidValidate } from 'uuid';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit, OnChanges {

  @Input() formId!: string;
  @ViewChild("formElement") formElement!: ElementRef;

  form: FormGroup;
  dynamicForm?: DynamicForm = {id : "", name: "", fields: []};
  
  constructor(private fb: FormBuilder,
    private formService: FormService
    ){
      this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = changes["formId"];
    this.formId = change.currentValue;

    if(this.formId != null && uuidValidate(this.formId))
    {
      let that = this;
      this.formService.getDynamicForm(that.formId).subscribe({
        next(val) {
          if(val == null)
          {
            return;
          }

          that.dynamicForm!.id = val.id;
          that.dynamicForm!.name = val.name;
          that.dynamicForm!.fields = val.fields;

          that.renderForm(that.dynamicForm!);
        },
        error(err) {
          console.log(err);
        }
      });
    }
    else if (this.formId == "")
    {
      this.deleteForm();
    }
  }

  ngOnInit(): void {

  }

  renderForm(dynamicForm: DynamicForm){

    if(dynamicForm.id == null || dynamicForm.name == null || dynamicForm.fields == null)
    {
      return;
    }

    if(dynamicForm.id == "" || dynamicForm.name == "" || dynamicForm.fields.length == 0)
    {
      return;
    }

    dynamicForm.fields.sort((a,b) => a.order-b.order);

    dynamicForm.fields.forEach((formField: FormField) => {
      let validations: Array<ValidatorFn> = [];

      formField.constraints.forEach((fieldConstraint: FieldConstraint) => {
        switch(fieldConstraint.name) {
          case "max":
            validations.push(Validators.max(Number(fieldConstraint.value)));
            break;
          case "min":
            validations.push(Validators.min(Number(fieldConstraint.value)));
            break;
          case "maxlength":
            validations.push(Validators.maxLength(Number(fieldConstraint.value)));
            break;
          case "minlength":
            validations.push(Validators.minLength(Number(fieldConstraint.value)));
            break;
          case "pattern":
            validations.push(Validators.pattern(fieldConstraint.value));
            break;
          case "required":
            validations.push(Validators.required);
            break;
        }
      });

      const formControl = new FormControl(formField.defaultValue, validations)

      this.form.addControl(formField.id, formControl);
    });

  }

  getConstraintText(formField: FormField, constraintName: ConstraintName) {
    const hint = formField.constraints.filter( field => field.name === constraintName);

    return hint.length === 1 ? hint[0].hint : "";
  }

  submitForm(formValue: AbstractControl) {

    if(this.form.valid)
    {
      console.log(formValue);
    }
  }

  resetForm() {
    this.form.reset();
  }

  deleteForm() {
    this.dynamicForm?.fields.forEach(field => {
      this.form.removeControl(field.id);
    });

    if(this.dynamicForm != null)
    {
      this.dynamicForm.name = "",
      this.dynamicForm.id = "",
      this.dynamicForm.fields = []
    }
    
  }

}
