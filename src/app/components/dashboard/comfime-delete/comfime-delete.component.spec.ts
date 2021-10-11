import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfimeDeleteComponent } from './comfime-delete.component';

describe('ComfimeDeleteComponent', () => {
  let component: ComfimeDeleteComponent;
  let fixture: ComponentFixture<ComfimeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfimeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfimeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
