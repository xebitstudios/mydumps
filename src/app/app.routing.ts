import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
]

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true })
