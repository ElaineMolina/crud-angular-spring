import { TestBed } from '@angular/core/testing';

import { CoursersService } from './coursers.service';

describe('CoursersService', () => {
  let service: CoursersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
