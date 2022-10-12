import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareLoginComponent } from './prepare-login.component';

describe('PrepareLoginComponent', () => {
  let component: PrepareLoginComponent;
  let fixture: ComponentFixture<PrepareLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
