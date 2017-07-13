/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropdownMenuComponent } from './dropdown-menu.component';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('should have expected dropdown menu options', async(() => {
    const fixture = TestBed.createComponent(DropdownMenuComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const links = compiled.querySelectorAll('.dropdown .dropdown-menu')
    expect(links.length).toBe(1)
  }))

});
