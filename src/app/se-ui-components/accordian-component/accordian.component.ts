import { Component, Input } from '@angular/core';

export interface ActionChangeEvent {
  accordianList: string[],
  }
@Component({
  selector: 'ngbd-accordion-basic',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss']

})
export class NgbdAccordionBasic {
  @Input()
  accordianList:string[]
  //MyArrayType = Array[{'isSelected': true}]
  constructor(){

  }

 public isSelected:boolean = false
 
 clearAllSelection(accordionValues){
    for(var i =0;i< accordionValues.length; i++){
       for(var j = 0; j < accordionValues[i].length;j++){
          for(var k = 0; k < accordionValues[i][j].checkboxes.length;k++){
           accordionValues[0][j].checkboxes[k].isSelected = false;
            
          }
        }
    }
 }
toUncheckCheckboxes(isChecked){
  if(isChecked){
   isChecked = false;
  }
 
}
 }
