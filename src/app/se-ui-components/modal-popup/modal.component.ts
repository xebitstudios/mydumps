import { Component, Input, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
export interface ActionChangeEvent {
  header: string,
  subheader: string,
  footersButton: string[]
}

@Component({
  selector: 'se-modal-popup',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalPopupComponent {
  @Input()
  header: string[]
  
  @Input()
  subheader: string

  @Input()
  footersButton:string[]
  
  @ViewChild('saveSearchModal') saveSearchModalPopup;
  private choseHelpOption: string = 'community';
  public filesData: Array<any> = [];
  public seAlertMsg: boolean = false
  public errorMsg: string = ""

  constructor(private modalService: NgbModal) {

  }
  ngAfterViewInit() {
  }
  openPopup() {
    let self = this;
    this.modalService.open(this.saveSearchModalPopup, { backdrop: "static", windowClass: 'browsetSpacePopup' }).result.then((result) => {
     console.log('testing'); 
    }, (reason) => {
    })
  }
 
}