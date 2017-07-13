import { Component,EventEmitter, Input, Output } from '@angular/core'

export interface ActionChangeEvent {
  placeholder: string,
 }
@Component({
  selector: 'se-select-box',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchBoxComponent {
@Input()
  placeholder: string[]

public isSearched:boolean = false
@Output() searchOnServer = new EventEmitter()  

 private searchValue: string
  search(terms: string) {
    this.searchValue = terms
    this.searchOnServer.emit(terms)
    this.isSearched = true;
    if(this.searchValue.length <= 0){
       this.isSearched = false;
    }
  }

  onEnter(searchValue: string) {
    this.searchValue = searchValue
    this.searchOnServer.emit(this.searchValue)
  }
  toSearchOnServer(){
    if(this.isSearched){
      this.isSearched = false;
    }
  }
 
}
