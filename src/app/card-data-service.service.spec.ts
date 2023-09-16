import { TestBed } from '@angular/core/testing';

import { CardDataServiceService } from './card-data-service.service';

describe('CardDataServiceService', () => {
  let service: CardDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
