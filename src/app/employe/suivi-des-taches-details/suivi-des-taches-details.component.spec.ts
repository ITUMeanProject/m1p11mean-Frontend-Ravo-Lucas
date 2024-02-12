import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviDesTachesDetailsComponent } from './suivi-des-taches-details.component';

describe('SuiviDesTachesDetailsComponent', () => {
  let component: SuiviDesTachesDetailsComponent;
  let fixture: ComponentFixture<SuiviDesTachesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviDesTachesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviDesTachesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
