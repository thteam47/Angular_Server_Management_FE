import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassuserComponent } from './changepassuser.component';

describe('ChangepassuserComponent', () => {
  let component: ChangepassuserComponent;
  let fixture: ComponentFixture<ChangepassuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepassuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepassuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
