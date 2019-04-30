import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule
} from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule
  ]
})

export class AngularMaterialModule{}
