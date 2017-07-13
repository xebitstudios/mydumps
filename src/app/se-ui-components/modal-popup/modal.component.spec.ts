/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalPopupComponent } from './modal.component';

describe('ModalPopupComponent', () => {
  let component: ModalPopupComponent;
  let fixture: ComponentFixture<ModalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open help', async(() => {
    const fixture = TestBed.createComponent(ModalPopupComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const links = compiled.querySelectorAll('.btn btn-sm btn-outline-primary')
    expect(links.length).toBe(1)
  }))

   it('should dismiss the modal on clicking continue', async(() => {
    const fixture = TestBed.createComponent(ModalPopupComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const firstRadio = compiled.querySelectorAll('#community')
    const ctnButton = compiled.querySelectorAll('.btn btn-primary')
    expect(firstRadio.value).toBe(true)
    expect(ctnButton.length).toBe(1)
  }))

  it('should exit the modal on clicking cancel', async(() => {
    const fixture = TestBed.createComponent(ModalPopupComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const cancelButton = compiled.querySelectorAll('.btn btn-secondary')
    expect(cancelButton.length).toBe(1)
  }))

});
