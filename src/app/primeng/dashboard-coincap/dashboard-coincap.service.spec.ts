import { TestBed } from '@angular/core/testing';

import { DashboardCoincapService } from './dashboard-coincap.service';

describe('DashboardCoincapService', () => {
  let service: DashboardCoincapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCoincapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
