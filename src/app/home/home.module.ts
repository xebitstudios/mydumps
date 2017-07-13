import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SESharedModule } from '../se-ui-components'
import { HomeRouting } from './home.routing'
import { HomePageComponent } from './home.component'
import { CustomerPageComponent } from './customer/customer.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    SESharedModule,
    NgbModule.forRoot()
  ],
  declarations: [
    HomePageComponent,
    CustomerPageComponent,
  ],
})
export class HomeModule {
}
