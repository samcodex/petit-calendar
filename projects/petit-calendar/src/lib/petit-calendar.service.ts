import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Calendar } from './petit-calendar.model';

@Injectable({
  providedIn: 'root'
})
export class PetitCalendarService {
  private calendarStream = new ReplaySubject<Calendar>(1);

  constructor() { }

  getCalendar(): Observable<Calendar> {
    return this.calendarStream.asObservable();
  }

  changeCalendar(calendar: Calendar) {
    this.calendarStream.next(calendar);
  }
}
