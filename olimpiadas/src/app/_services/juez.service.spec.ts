import { TestBed } from '@angular/core/testing';

import { JuezService } from './juez.service';

describe('JuezService', () => {
  let service: JuezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
