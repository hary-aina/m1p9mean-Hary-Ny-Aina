import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEkalyComponent } from './home-ekaly.component';

describe('HomeEkalyComponent', () => {
  let component: HomeEkalyComponent;
  let fixture: ComponentFixture<HomeEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
