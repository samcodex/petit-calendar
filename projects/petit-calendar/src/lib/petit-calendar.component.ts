import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Calendar, Week, Day } from './petit-calendar.model';
import { PetitCalendarService } from './petit-calendar.service';

declare var require: any;

@Component({
  selector: 'ngp-petit-calendar',
  templateUrl: 'petit-calendar.component.html',
  styleUrls: ['petit-calendar.component.css']
})
export class PetitCalendarComponent implements OnInit {
  @Input()
  locale = 'en';
  @Input()
  viewDate = new Date();
  @Input()
  indicator = false;
  @Input()
  highlightSelectedDate = false;
  @Input()
  highlightSelectedWeek = true;
  @Input()
  showWeekDayName = true;

  @Output()
  changeViewDate = new EventEmitter<Date>();
  @Output()
  changeViewMonth = new EventEmitter<Date>();

  calendar: Calendar;
  weekdays: string[];

  constructor(
    private calendarService: PetitCalendarService
  ) { }

  ngOnInit() {
    this.calendar = new Calendar(this.locale, this.viewDate);
    this.weekdays = this.calendar.weekdaysShort.map(day => day.replace('.', ''));

    this.calendarService.changeCalendar(this.calendar);
  }

  get title() {
    return this.calendar.title;
  }

  get weeks(): Week[] {
    return this.calendar.weeks;
  }

  getDayCellClass(day: Day): string {
    let cssClass = 'day-cell-not-current';
    if (day.isWeekend) {
      cssClass = 'day-cell-weekend';
    } else if (day.isCurrentMonth) {
      cssClass = day.isToday ? 'day-cell-today' : 'day-cell-current';
    }

    if (this.highlightSelectedDate && day.isSelected && !day.isToday) {
      cssClass += ' day-cell-selected';
    }

    return cssClass;
  }

  previous() {
    this.calendar.previous();
    this.changeViewMonth.emit(this.calendar.firstMomentOfMonth.toDate());
    this.calendarService.changeCalendar(this.calendar);
  }

  next() {
    this.calendar.next();
    this.changeViewMonth.emit(this.calendar.firstMomentOfMonth.toDate());
    this.calendarService.changeCalendar(this.calendar);
  }

  select(day: Day) {
    const selectedDay = this.calendar.change(day.dayMoment, true);
    this.changeViewDate.emit(selectedDay.dayMoment.toDate());
    this.calendarService.changeCalendar(this.calendar);
  }
}
