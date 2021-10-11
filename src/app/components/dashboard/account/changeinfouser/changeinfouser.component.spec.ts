import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeinfouserComponent } from './changeinfouser.component';

describe('ChangeinfouserComponent', () => {
  let component: ChangeinfouserComponent;
  let fixture: ComponentFixture<ChangeinfouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeinfouserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeinfouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
