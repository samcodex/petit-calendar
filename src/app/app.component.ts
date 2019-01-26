import { Component, OnInit } from '@angular/core';
import { PetitCalendarService } from 'petit-calendar';
import { Calendar } from 'petit-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PetitCalendarService ]
})
export class AppComponent implements OnInit {
  title = 'petit-calendar';

  constructor(
    private calendarService: PetitCalendarService
  ) {}

  ngOnInit() {
    this.calendarService.getCalendar().subscribe((calendar: Calendar) => {
      console.log('current calendar:', calendar, calendar.days);
      calendar.days.forEach(day => {
        day.indicators.first = day.date % 2 === 0;
        day.indicators.second = day.date % 3 === 0;
      });
    });
  }
}
