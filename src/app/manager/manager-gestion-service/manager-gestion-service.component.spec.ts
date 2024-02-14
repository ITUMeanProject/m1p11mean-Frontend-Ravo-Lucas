import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGestionServiceComponent } from './manager-gestion-service.component';

describe('ManagerGestionServiceComponent', () => {
  let component: ManagerGestionServiceComponent;
  let fixture: ComponentFixture<ManagerGestionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGestionServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGestionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
