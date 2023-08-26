import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationTypesComponent } from './examination-types.component';

describe('ExaminationTypesComponent', () => {
  let component: ExaminationTypesComponent;
  let fixture: ComponentFixture<ExaminationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
