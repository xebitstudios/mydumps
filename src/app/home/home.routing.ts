import { RouterModule, Routes } from '@angular/router'

//import { AuthGuard } from '~/app.service.auth-guard'
import { HomePageComponent } from './home.component'
import { CustomerPageComponent } from './customer/customer.component'

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'customer',
    component: CustomerPageComponent,
  }

]

export const HomeRouting = RouterModule.forChild(routes)
