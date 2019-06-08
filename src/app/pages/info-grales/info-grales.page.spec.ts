import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGralesPage } from './info-grales.page';

describe('InfoGralesPage', () => {
  let component: InfoGralesPage;
  let fixture: ComponentFixture<InfoGralesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGralesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGralesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
