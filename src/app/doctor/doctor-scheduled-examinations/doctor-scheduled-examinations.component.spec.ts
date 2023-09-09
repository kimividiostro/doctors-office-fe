import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduledExaminationsComponent } from './doctor-scheduled-examinations.component';

describe('DoctorScheduledExaminationsComponent', () => {
  let component: DoctorScheduledExaminationsComponent;
  let fixture: ComponentFixture<DoctorScheduledExaminationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduledExaminationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduledExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
