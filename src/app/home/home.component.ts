import { Component, OnInit, ViewChild } from '@angular/core'
//import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'


@Component({
  // selector: 'se-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {

  @ViewChild("tabs")
  tabs

  @ViewChild("tabsConfigureModal")
  tabsConfigureModal
  tester = 'any'
  
  constructor () {

  }

  ngOnInit(){

  }
   actionSourceChange(newval) {
    this.tester = newval.value
  }
  
  SearchText = "Search box placeholder"
  public accordianList = [{"name":"Vertical Segment","checkboxes":[{"name":"Pharmaciuticals","isSelected":false},{"name":"Telecom","isSelected":false}],"isOpen":false},{"name":"Account Category","checkboxes":[ {"name":"IBM Commercial","isSelected":false},{"name":"IBM Shared","isSelected":false}],"isOpen":false}]

}
