import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageRendezvousComponent } from './affichage-rendezvous.component';

describe('AffichageRendezvousComponent', () => {
  let component: AffichageRendezvousComponent;
  let fixture: ComponentFixture<AffichageRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
