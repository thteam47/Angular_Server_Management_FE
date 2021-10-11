import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SshterminalComponent } from './sshterminal.component';

describe('SshterminalComponent', () => {
  let component: SshterminalComponent;
  let fixture: ComponentFixture<SshterminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SshterminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SshterminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
