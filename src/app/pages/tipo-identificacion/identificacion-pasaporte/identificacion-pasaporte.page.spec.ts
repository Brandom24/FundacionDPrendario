import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionPasaportePage } from './identificacion-pasaporte.page';

describe('IdentificacionPasaportePage', () => {
  let component: IdentificacionPasaportePage;
  let fixture: ComponentFixture<IdentificacionPasaportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificacionPasaportePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacionPasaportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
