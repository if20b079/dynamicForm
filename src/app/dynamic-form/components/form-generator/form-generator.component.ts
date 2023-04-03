import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstraintName } from '../../models/ConstraintName.type';
import { DynamicForm } from '../../models/DynamicForm.interface';
import { FieldType } from '../../models/FieldType.type';
import { FormField } from '../../models/FormField.interface';
import { v4 as uuid4 } from 'uuid';
import { FormService } from '../../services/form-service.service';

type ConstraintSelectOption = {value: ConstraintName, name: string, validFor: Array<FieldType>};

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent {

  constraintOptions : Array<ConstraintSelectOption> = [
    {value: "min", validFor: ["date", "number"], name: "Minimum"},
    {value: "max", validFor: ["date", "number"], name: "Maximum"},
    {value: "maxlength", validFor: ["email", "text"], name: "Max Length"},
    {value: "minlength", validFor: ["email", "text"], name: "Min Length"},
    {value: "pattern", validFor: ["email", "text"], name: "Pattern"},
    {value: "required", validFor: ["date", "email", "number", "text"], name: "Required"}
  ]

  form: FormGroup;

  constructor(private fb: FormBuilder,
      private formService: FormService
    ) {
    this.form = fb.group({
      name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      fields: fb.array([])
    })

  }

  submitForm(formValue: DynamicForm)
  {
    if(this.form.valid)
    {
      let order = 0;
      formValue.fields.forEach( (field: FormField) => { 
        field.id = uuid4();
        field.order = order;
        order++;
      });

      formValue.id = uuid4();
      
      this.formService.saveDynamicForm(formValue);
    } 
  }

  private createFieldControl() {
    return this.fb.group({
      label: [null, [Validators.required, Validators.maxLength(100)]],
      fieldType: [null, [Validators.required]],
      defaultValue: [null, []],
      placeholder: [null, []],
      constraints: this.fb.array([]),
      hint: [null, []]
    });
  }

  private createConstraintControl() {
    return this.fb.group({
      name: [null, [Validators.required]],
      value: [null],
      hint: [null]
    });
  }

  formFieldArray(): FormArray {
    return this.form.get("fields") as FormArray
  }

  fieldConstraintArray(fieldIndex: number): FormArray {
    return this.formFieldArray().at(fieldIndex).get("constraints") as FormArray;
  }

  addField() {
    this.formFieldArray().push(this.createFieldControl());
  }

  removeField(i: number) {
    this.formFieldArray().removeAt(i);
  }

  addFieldConstraint(fieldIndex: number) {
    this.fieldConstraintArray(fieldIndex).push(this.createConstraintControl());
  }

  removeFieldConstraint(fieldIndex: number, constraintIndex: number) {
    this.fieldConstraintArray(fieldIndex).removeAt(constraintIndex);
  }

  drop(event: CdkDragDrop<any[]>) {
    const tmp = this.formFieldArray().at(event.previousIndex);
    this.formFieldArray().removeAt(event.previousIndex);
    this.formFieldArray().insert(event.currentIndex, tmp);
  }

  getConstraintOptions(fieldIndex: number) {
    const fieldType: FieldType = this.formFieldArray().at(fieldIndex).value.fieldType;
    return this.constraintOptions.filter(val => val.validFor.includes(fieldType));
  }

  resetForm()
  {
    this.form.reset();
  }

  addConstraintDisabled(fieldIndex: number) {
    return this.formFieldArray().at(fieldIndex).value.fieldType == null;
  }

  disableRequiredValue(fieldIndex: number, constraintIndex: number) {
    if((this.formFieldArray().at(fieldIndex).value as FormField).constraints[constraintIndex].name === "required")
    {
      this.fieldConstraintArray(fieldIndex).at(constraintIndex).get("value")?.disable();
      this.fieldConstraintArray(fieldIndex).at(constraintIndex).get("value")?.setValue("true");
    }
    else {
      this.fieldConstraintArray(fieldIndex).at(constraintIndex).get("value")?.enable();
      this.fieldConstraintArray(fieldIndex).at(constraintIndex).get("value")?.setValue(null);
    }
  }
}
