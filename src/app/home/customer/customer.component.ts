import { Component, Input, Output, OnInit } from '@angular/core'

@Component({
  selector: 'se-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerPageComponent {
  public menuList: Array<any> = [
    {
      name: 'Core Customer',
      url: '/corecustomer',
      submenus: [
        /*  ['Leads', '/coming-soon'],
          ['Qualification', '/coming-soon'],
          ['Solutions', '/coming-soon'],
          ['Support Requests', '/coming-soon'],
          ['Activities', '/coming-soon'],
          ['Files', '/coming-soon']*/
      ],
    },
    {
      name: 'Site Information',
      url: '/coming-soon',
      submenus: [
      ],
    },
    {
      name: 'CSAT',
      url: '/coming-soon',
      submenus: [
      ],
    },
    {
      name: 'Service Action Plan',
      url: '/coming-soon',
      submenus: [
      ],
    },
    {
      name: 'All Contacts',
      url: '/coming-soon',
      submenus: [

      ],
    },
    {
      name: 'Documents',
      url: '/coming-soon',
      submenus: [
      ],
    }
  ]

  constructor(
    // menuProvider: MenuProvider
  ) {
  }

}
