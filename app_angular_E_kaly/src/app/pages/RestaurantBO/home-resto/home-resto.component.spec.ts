import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRestoComponent } from './home-resto.component';

describe('HomeRestoComponent', () => {
  let component: HomeRestoComponent;
  let fixture: ComponentFixture<HomeRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
