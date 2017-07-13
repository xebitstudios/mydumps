/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing'

import { AppModule } from '~/app.module'
import { HomePageComponent } from './home.component'

describe('Home Page', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    })
  })

  it('should create the home page', async(() => {
    const fixture = TestBed.createComponent(HomePageComponent)
    const component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy()
  }))

})
