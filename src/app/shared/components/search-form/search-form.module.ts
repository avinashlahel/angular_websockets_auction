import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    SearchFormComponent
  ],
  declarations: [SearchFormComponent]
})
export class SearchFormModule { }
