/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'

import { SESharedModule } from '~/se-ui-components'
import { ButtonComponent } from './button.component'

describe('Button', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SESharedModule,
      ],
    })
  })

  it('should create the button', async(() => {
    const fixture = TestBed.createComponent(ButtonComponent)
    const component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy()
  }))

  it('should have expected label', async(() => {
    const fixture = TestBed.createComponent(ButtonComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const button = compiled.querySelector('button')
    // expect(button.textContent).toBe('Default Button')
    // TODO
  }))

})
