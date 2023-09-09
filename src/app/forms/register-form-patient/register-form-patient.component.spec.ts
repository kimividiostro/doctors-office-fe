import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormPatientComponent } from './register-form-patient.component';

describe('RegisterFormPatientComponent', () => {
  let component: RegisterFormPatientComponent;
  let fixture: ComponentFixture<RegisterFormPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
