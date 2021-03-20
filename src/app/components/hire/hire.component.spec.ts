import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireComponent } from './hire.component';

describe('HireComponent', () => {
  let component: HireComponent;
  let fixture: ComponentFixture<HireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
