import { NgModule } from '@angular/core';
import { PetitCalendarComponent } from './petit-calendar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PetitCalendarComponent],
  exports: [PetitCalendarComponent]
})
export class PetitCalendarModule { }
