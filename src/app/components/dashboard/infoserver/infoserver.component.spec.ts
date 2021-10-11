import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoserverComponent } from './infoserver.component';

describe('InfoserverComponent', () => {
  let component: InfoserverComponent;
  let fixture: ComponentFixture<InfoserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
