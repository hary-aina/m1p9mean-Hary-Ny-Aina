import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEkalyComponent } from './navbar-ekaly.component';

describe('NavbarEkalyComponent', () => {
  let component: NavbarEkalyComponent;
  let fixture: ComponentFixture<NavbarEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
