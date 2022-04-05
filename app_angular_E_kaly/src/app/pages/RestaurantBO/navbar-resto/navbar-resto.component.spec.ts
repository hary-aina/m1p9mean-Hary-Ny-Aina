import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRestoComponent } from './navbar-resto.component';

describe('NavbarRestoComponent', () => {
  let component: NavbarRestoComponent;
  let fixture: ComponentFixture<NavbarRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
