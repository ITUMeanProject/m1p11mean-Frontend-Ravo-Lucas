import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGestionEmployeComponent } from './manager-gestion-employe.component';

describe('ManagerGestionEmployeComponent', () => {
  let component: ManagerGestionEmployeComponent;
  let fixture: ComponentFixture<ManagerGestionEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGestionEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGestionEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
