import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionOficialPage } from './identificacion-oficial.page';

describe('IdentificacionOficialPage', () => {
  let component: IdentificacionOficialPage;
  let fixture: ComponentFixture<IdentificacionOficialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificacionOficialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacionOficialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
