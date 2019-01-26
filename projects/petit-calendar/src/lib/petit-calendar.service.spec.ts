import { TestBed } from '@angular/core/testing';

import { PetitCalendarService } from './petit-calendar.service';

describe('PetitCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetitCalendarService = TestBed.get(PetitCalendarService);
    expect(service).toBeTruthy();
  });
});
