import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { JsonpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// components
import { TopNavComponent } from '../home/top-nav'
import { FooterNavComponent } from '../home/footer'
import { MenuComponent } from '../home/menu'
import { ActionButtonComponent } from './action-button'
import { ButtonComponent } from './button'
import { NgbdAccordionBasic } from './accordian-component/accordian.component.module'
import { NgbdDatepickerPopup } from './datepicker/datepicker.component.module'
import { ModalPopupComponent } from './modal-popup/modal.module'
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component.module'
import { SearchBoxComponent } from './search-component/search.component.module'

//services
import { Analytics } from '../se-ui-services/global/analytics/analytics'
import { MenuProvider } from '../se-ui-services/menu'

// directives
import {
  SVGDirective, SVGCache
} from './directives/svg'

const declarations = [
  // components
  TopNavComponent,
  FooterNavComponent,
  MenuComponent,
  ButtonComponent,
  ActionButtonComponent,
  // directives
  SVGDirective,
  NgbdAccordionBasic,
  NgbdDatepickerPopup,
  ModalPopupComponent,
  DropdownMenuComponent,
  SearchBoxComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    JsonpModule,
    ReactiveFormsModule,
    ...declarations,
  ],
  declarations,
  providers: [
    Analytics,
    SVGCache,
    MenuProvider
  ]
})
export class SESharedModule {
}
