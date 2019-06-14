import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionPage } from './verificacion.page';

describe('VerificacionPage', () => {
  let component: VerificacionPage;
  let fixture: ComponentFixture<VerificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
