import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSimilitudConfirmacionPage } from './consulta-similitud-confirmacion.page';

describe('ConsultaSimilitudConfirmacionPage', () => {
  let component: ConsultaSimilitudConfirmacionPage;
  let fixture: ComponentFixture<ConsultaSimilitudConfirmacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaSimilitudConfirmacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSimilitudConfirmacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
