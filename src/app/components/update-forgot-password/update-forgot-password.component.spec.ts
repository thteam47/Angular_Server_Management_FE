import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForgotPasswordComponent } from './update-forgot-password.component';

describe('UpdateForgotPasswordComponent', () => {
  let component: UpdateForgotPasswordComponent;
  let fixture: ComponentFixture<UpdateForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
