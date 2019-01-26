import * as moment_ from 'moment';
const moment = moment_;

const isSameDate = (date1: moment_.Moment, date2: moment_.Moment) => {
  return date1.format('YYYY-MM-DD') === date2.format('YYYY-MM-DD');
};

export interface Day {
  dayMoment: moment_.Moment;
  date: number;

  isToday: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isSelected?: boolean;

  indicators?: { first?: boolean, second?: boolean };
  tips?: string;
}

export interface Week {
  days: Day[];
}

export class Calendar {
  locale: string;
  today: moment_.Moment = moment();
  firstMomentOfMonth: moment_.Moment = this.today.clone();

  weeks: Week[] = [];

  constructor(locale = 'en', date: Date = new Date()) {
    this.locale = locale;

    this.firstMomentOfMonth.locale(this.locale);
    this.setFirstMoment(date);
  }

  get title() {
    return this.firstMomentOfMonth.format('MMM YYYY');
  }

  get days(): Day[] {
    const days: Day[] = [];
    this.weeks.forEach(week => {
      days.push.apply(days, week.days);
    });

    return days;
  }

  next() {
    this.firstMomentOfMonth.add(1, 'M');
    this.createCalendarWeeks();
  }

  previous() {
    this.firstMomentOfMonth.add(-1, 'month');
    this.createCalendarWeeks();
  }

  change(date: moment_.Moment, isSelected = false): Day {
    this.setFirstMoment(date);

    let found: Day = null;
    if (isSelected) {
      this.weeks.forEach( week => {
        week.days.forEach(day => {
          day.isSelected = isSameDate(day.dayMoment, date);
          if (day.isSelected) {
            found = day;
          }
        });
      });
    } else {
      found = this.findDay(date);
    }

    return found;
  }

  private createCalendarWeeks() {
    this.weeks.length = 0;

    const today = this.today;
    const weeks = this.weeks;
    const firstMoment = this.firstMomentOfMonth.clone();

    const todayDate = today.date();
    const currentMonth = firstMoment.month();

    let isNextMonth = false;
    const theMoment = firstMoment.startOf('week');
    for (let i = 0; i < 6; i++) {
      if (isNextMonth) {
        break;
      }

      const week: Week = { days: [] };
      const days: Day[] = week.days;
      weeks.push(week);

      for (let j = 0; j < 7; j++) {
        const month = theMoment.month();
        const date = theMoment.date();
        const day = theMoment.day();
        const isCurrentMonth = month === currentMonth;
        const isWeekend = day === 0 || day === 6;
        const dayMoment = theMoment.clone();
        const indicators = {};
        const isToday = isCurrentMonth && isSameDate(theMoment, this.today);
        const dayCell: Day = { dayMoment, date, isToday, isCurrentMonth, isWeekend, indicators };

        days.push(dayCell);
        theMoment.add(1, 'day');
        isNextMonth = month > currentMonth;
      }
    }
  }

  findDay(date: moment_.Moment): Day {
    let found = null;
    this.weeks.find( week => {
        found = week.days.find( day => isSameDate(day.dayMoment, date));
        return !!found;
    });

    return found;
  }

  private setFirstMoment(date: Date | moment_.Moment = this.firstMomentOfMonth) {
    let year: number, month: number;
    if (date instanceof Date) {
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      year = date.year();
      month = date.month();
    }

    this.firstMomentOfMonth.year(year).month(month).date(1);
    this.createCalendarWeeks();
  }
}
