import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ConstraintName } from '../../models/ConstraintName.type';
import { DynamicForm } from '../../models/DynamicForm.interface';
import { FieldConstraint } from '../../models/FieldConstraint.interface';
import { FormField } from '../../models/FormField.interface';
import { FormService } from '../../services/form-service.service';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit {

  form: FormGroup;
  dynamicForm?: DynamicForm;
  
  constructor(private fb: FormBuilder,
    private formService: FormService
    ){
      this.form = this.fb.group({});
  }

  ngOnInit(): void {
    let that = this;
    this.formService.getDynamicForm("ff6a2f1c-1ce2-4ffc-a018-171f28c99d6b").subscribe({
      next(val) {
        that.dynamicForm = val;
        that.renderForm(val);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log(that.form)
      }
    });
  }

  renderForm(dynamicForm: DynamicForm){
    
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

  resetForm()
  {
    this.form.reset();
  }

}
