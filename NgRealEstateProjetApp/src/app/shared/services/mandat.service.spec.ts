import { TestBed } from '@angular/core/testing';

import { MandatService } from './mandat.service';

describe('MandatService', () => {
  let service: MandatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
