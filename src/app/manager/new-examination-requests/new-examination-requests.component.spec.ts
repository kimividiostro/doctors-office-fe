import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExaminationRequestsComponent } from './new-examination-requests.component';

describe('NewExaminationRequestsComponent', () => {
  let component: NewExaminationRequestsComponent;
  let fixture: ComponentFixture<NewExaminationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExaminationRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewExaminationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
