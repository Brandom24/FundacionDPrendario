import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaAutografaPage } from './firma-autografa.page';

describe('FirmaAutografaPage', () => {
  let component: FirmaAutografaPage;
  let fixture: ComponentFixture<FirmaAutografaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaAutografaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaAutografaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
