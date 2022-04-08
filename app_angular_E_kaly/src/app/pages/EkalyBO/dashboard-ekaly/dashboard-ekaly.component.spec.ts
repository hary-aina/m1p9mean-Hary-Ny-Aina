import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEkalyComponent } from './dashboard-ekaly.component';

describe('DashboardEkalyComponent', () => {
  let component: DashboardEkalyComponent;
  let fixture: ComponentFixture<DashboardEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
