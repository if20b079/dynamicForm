import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FormRendererComponent,
    FormGeneratorComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    FormGeneratorComponent,
    FormRendererComponent
  ]
})
export class DynamicFormModule { }
