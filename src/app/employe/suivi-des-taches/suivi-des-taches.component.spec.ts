import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviDesTachesComponent } from './suivi-des-taches.component';

describe('SuiviDesTachesComponent', () => {
  let component: SuiviDesTachesComponent;
  let fixture: ComponentFixture<SuiviDesTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviDesTachesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviDesTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
