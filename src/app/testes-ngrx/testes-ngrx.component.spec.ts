import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesNgrxComponent } from './testes-ngrx.component';

describe('TestesNgrxComponent', () => {
  let component: TestesNgrxComponent;
  let fixture: ComponentFixture<TestesNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestesNgrxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestesNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
