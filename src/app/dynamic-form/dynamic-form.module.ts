import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FormRendererComponent,
    FormGeneratorComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatExpansionModule,
    DragDropModule
  ],
  exports: [
    FormGeneratorComponent,
    FormRendererComponent
  ]
})
export class DynamicFormModule { }
