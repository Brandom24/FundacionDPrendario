import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaInePage } from './consulta-ine.page';

describe('ConsultaInePage', () => {
  let component: ConsultaInePage;
  let fixture: ComponentFixture<ConsultaInePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaInePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaInePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
