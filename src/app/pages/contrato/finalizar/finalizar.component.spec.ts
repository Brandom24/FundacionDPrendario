import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarComponent } from './finalizar.component';

describe('FinalizarComponent', () => {
  let component: FinalizarComponent;
  let fixture: ComponentFixture<FinalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
