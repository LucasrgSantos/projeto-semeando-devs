import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Questionario1Component } from './questionario1.component';

describe('Questionario1Component', () => {
  let component: Questionario1Component;
  let fixture: ComponentFixture<Questionario1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Questionario1Component]
    });
    fixture = TestBed.createComponent(Questionario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
