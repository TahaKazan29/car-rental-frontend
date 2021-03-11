/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RentalService } from './rental.service';

describe('Service: Rental', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentalService]
    });
  });

  it('should ...', inject([RentalService], (service: RentalService) => {
    expect(service).toBeTruthy();
  }));
});
