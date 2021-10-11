import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimedeleteuserComponent } from './confimedeleteuser.component';

describe('ConfimedeleteuserComponent', () => {
  let component: ConfimedeleteuserComponent;
  let fixture: ComponentFixture<ConfimedeleteuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfimedeleteuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimedeleteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
