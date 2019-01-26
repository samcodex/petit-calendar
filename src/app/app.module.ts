import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PetitCalendarModule } from 'petit-calendar';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PetitCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
