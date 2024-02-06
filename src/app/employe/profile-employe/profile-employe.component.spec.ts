import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmployeComponent } from './profile-employe.component';

describe('ProfileComponent', () => {
  let component: ProfileEmployeComponent;
  let fixture: ComponentFixture<ProfileEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
