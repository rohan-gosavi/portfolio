import { TestBed } from '@angular/core/testing';

import { InstagramServiceService } from './instagram-service.service';

describe('InstagramServiceService', () => {
  let service: InstagramServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstagramServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
