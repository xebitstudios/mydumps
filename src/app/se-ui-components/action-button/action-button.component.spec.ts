/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActionButtonComponent } from './action-button.component';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('should have expected dropdown menu options', async(() => {
    const fixture = TestBed.createComponent(ActionButtonComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const links = compiled.querySelectorAll('.dropdown .dropdown-menu')
    expect(links.length).toBe(1)
  }))

});
