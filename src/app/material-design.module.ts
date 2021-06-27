import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule, MatNativeDateModule, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatCommonModule,
    MatNativeDateModule,
    MatRippleModule,
    MatOptionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  declarations: []
})
export class MaterialDesignModule {}
