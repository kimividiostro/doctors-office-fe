import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormUserComponent } from './login-form-user.component';

describe('LoginFormUserComponent', () => {
  let component: LoginFormUserComponent;
  let fixture: ComponentFixture<LoginFormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
