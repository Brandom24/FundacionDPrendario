import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDomicilioConfirmPage } from './captura-domicilio-confirm.page';

describe('CapturaDomicilioConfirmPage', () => {
  let component: CapturaDomicilioConfirmPage;
  let fixture: ComponentFixture<CapturaDomicilioConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDomicilioConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDomicilioConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
