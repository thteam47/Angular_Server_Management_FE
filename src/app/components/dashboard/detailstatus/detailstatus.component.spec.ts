import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstatusComponent } from './detailstatus.component';

describe('DetailstatusComponent', () => {
  let component: DetailstatusComponent;
  let fixture: ComponentFixture<DetailstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
