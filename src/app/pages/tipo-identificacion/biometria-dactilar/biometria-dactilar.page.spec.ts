import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometriaDactilarPage } from './biometria-dactilar.page';

describe('BiometriaDactilarPage', () => {
  let component: BiometriaDactilarPage;
  let fixture: ComponentFixture<BiometriaDactilarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometriaDactilarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometriaDactilarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
