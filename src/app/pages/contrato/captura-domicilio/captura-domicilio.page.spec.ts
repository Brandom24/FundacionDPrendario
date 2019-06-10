import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDomicilioPage } from './captura-domicilio.page';

describe('CapturaDomicilioPage', () => {
  let component: CapturaDomicilioPage;
  let fixture: ComponentFixture<CapturaDomicilioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDomicilioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
