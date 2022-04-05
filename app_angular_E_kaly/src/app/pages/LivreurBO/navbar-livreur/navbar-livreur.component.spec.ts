import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLivreurComponent } from './navbar-livreur.component';

describe('NavbarLivreurComponent', () => {
  let component: NavbarLivreurComponent;
  let fixture: ComponentFixture<NavbarLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
