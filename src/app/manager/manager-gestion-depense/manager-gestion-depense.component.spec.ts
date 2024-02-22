import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGestionDepenseComponent } from './manager-gestion-depense.component';

describe('ManagerGestionDepenseComponent', () => {
  let component: ManagerGestionDepenseComponent;
  let fixture: ComponentFixture<ManagerGestionDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGestionDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGestionDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
