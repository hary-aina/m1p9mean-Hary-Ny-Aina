import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRestoComponent } from './dashboard-resto.component';

describe('DashboardRestoComponent', () => {
  let component: DashboardRestoComponent;
  let fixture: ComponentFixture<DashboardRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
