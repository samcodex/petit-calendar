import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitCalendarComponent } from './petit-calendar.component';

describe('PetitCalendarComponent', () => {
  let component: PetitCalendarComponent;
  let fixture: ComponentFixture<PetitCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
