import { Component, OnInit, ViewChild} from '@angular/core'
import { ModalPopupComponent } from '../../se-ui-components/modal-popup/modal.component'

@Component({
  selector: 'se-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['../../app.component.scss']
})
export class FooterNavComponent implements OnInit {
  @ViewChild(ModalPopupComponent)
  popupChild: ModalPopupComponent
  public HeaderValue = 'My Accounts - Sales Team'
  public subHeaderValue = 'testing'
  public footersButton =[{"title":"Cancel", "isClose":"true","class":"btn-secondary"},{"title":"Save", "isClose":"false","class":"btn-primary"}]
  constructor() {
  }

  ngOnInit() {

  }

  openPopup(): void {
    // this.isOpened = true
    this.popupChild.openPopup()
  }
}