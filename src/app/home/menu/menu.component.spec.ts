/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'

import { SESharedModule } from '~/se-ui-components/index'
import { MenuProvider } from '~/se-ui-services/menu/menu.provider'
import { MockMenuProvider } from '~/se-ui-services/menu/mock.menu.provider'
import { MenuComponent } from './menu.component'

describe('Menu Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SESharedModule,
      ],
      providers: [
        { provide: MenuProvider, useClass: MockMenuProvider},
      ],
    })
  })

  it('should create the menu list', async(() => {
    const fixture = TestBed.createComponent(MenuComponent)
    const component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy()
  }))

  it('should have expected label', async(() => {
    const fixture = TestBed.createComponent(MenuComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const button = compiled.querySelector('button')
    // expect(button.textContent).toBe('Default Button')
    // TODO
  }))

})
