import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaContratoPage } from './firma-contrato.page';

describe('FirmaContratoPage', () => {
  let component: FirmaContratoPage;
  let fixture: ComponentFixture<FirmaContratoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaContratoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaContratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
