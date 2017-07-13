import { Component, Input, Output, OnInit } from '@angular/core'
import { MenuProvider } from 'app/se-ui-services/menu/menu.provider'

@Component({
  selector: 'se-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() sideMenuList = ''
  @Input() activePage = ''
  @Input() currentURL = ''
  @Input() parentURL = ''

  constructor(
    menuProvider: MenuProvider
  ) {
  }

}
