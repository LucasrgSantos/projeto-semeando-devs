import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroComponent } from './numero.component';

describe('NumeroComponent', () => {
  let component: NumeroComponent;
  let fixture: ComponentFixture<NumeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumeroComponent]
    });
    fixture = TestBed.createComponent(NumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
