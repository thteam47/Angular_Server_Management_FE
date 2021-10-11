import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartstatusComponent } from './chartstatus.component';

describe('ChartstatusComponent', () => {
  let component: ChartstatusComponent;
  let fixture: ComponentFixture<ChartstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
