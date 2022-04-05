import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLivreurComponent } from './home-livreur.component';

describe('HomeLivreurComponent', () => {
  let component: HomeLivreurComponent;
  let fixture: ComponentFixture<HomeLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
