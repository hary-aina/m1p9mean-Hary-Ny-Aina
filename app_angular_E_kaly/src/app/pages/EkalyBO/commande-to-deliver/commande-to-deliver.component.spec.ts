import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeToDeliverComponent } from './commande-to-deliver.component';

describe('CommandeToDeliverComponent', () => {
  let component: CommandeToDeliverComponent;
  let fixture: ComponentFixture<CommandeToDeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeToDeliverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeToDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
