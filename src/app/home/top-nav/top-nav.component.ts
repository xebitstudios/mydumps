import { Component, ViewChild, OnInit, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import navbarmodel from './nav-menubar'

@Component({
  selector: 'se-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  //private person: Person
  private profileURL: string
  private isVisible: boolean = false
  private menubarmodel: any
  private userprofilemenu: any
  private currentSelectedMenu: any

  constructor() {
  }

  ngOnInit() {
    this.menubarmodel = navbarmodel.navMenubarmodel
    this.userprofilemenu = navbarmodel.userProfileMenumodel
  }

  inactiveAllMenu(){
    this.menubarmodel.filter(menu => menu.active = false)
    this.menubarmodel.filter(menu => menu.active)
      .forEach(menu => menu.active = false)
    this.userprofilemenu.filter(userprofilemenu => userprofilemenu.active)
      this.userprofilemenu.active = false
  }

  hideSubmenu(menu) {
    this.inactiveAllMenu()
    this.isVisible = false
    if (this.currentSelectedMenu)
      this.currentSelectedMenu.active = false
    menu.active = true
    this.currentSelectedMenu = menu
  }

  showSubmenu() {
    this.isVisible = true
  }

  notifyError = (err) => {
    console.error('Fetching person failed', err)
  }

}
