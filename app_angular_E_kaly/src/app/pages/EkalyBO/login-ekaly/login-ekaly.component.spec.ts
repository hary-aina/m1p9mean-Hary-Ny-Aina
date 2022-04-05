import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEkalyComponent } from './login-ekaly.component';

describe('LoginEkalyComponent', () => {
  let component: LoginEkalyComponent;
  let fixture: ComponentFixture<LoginEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
