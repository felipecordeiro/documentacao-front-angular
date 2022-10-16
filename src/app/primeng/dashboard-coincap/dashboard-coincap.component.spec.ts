import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoincapComponent } from './dashboard-coincap.component';

describe('DashboardCoincapComponent', () => {
  let component: DashboardCoincapComponent;
  let fixture: ComponentFixture<DashboardCoincapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCoincapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCoincapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
