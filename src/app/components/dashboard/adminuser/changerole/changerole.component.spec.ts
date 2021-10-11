import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeroleComponent } from './changerole.component';

describe('ChangeroleComponent', () => {
  let component: ChangeroleComponent;
  let fixture: ComponentFixture<ChangeroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeroleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
