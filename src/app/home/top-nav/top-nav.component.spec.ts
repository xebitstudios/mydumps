/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have expected navigation links', async(() => {
    const fixture = TestBed.createComponent(TopNavComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const links = compiled.querySelectorAll('.nav .nav-item ul')
    expect(links.length).toBe(4)
    // TODO actual verify anchor text and href value
  }))

  it('should have user menu', async(() => {
    const fixture = TestBed.createComponent(TopNavComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const links = compiled.querySelectorAll('.se-user-menu .user-menu-dropdown')
    expect(links.length).toBe(5)
    // TODO actual verify anchor text and href value
  }))

});
