import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExaminationsComponent } from './my-examinations.component';

describe('MyExaminationsComponent', () => {
  let component: MyExaminationsComponent;
  let fixture: ComponentFixture<MyExaminationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExaminationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
