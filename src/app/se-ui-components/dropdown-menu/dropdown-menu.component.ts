import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'

export interface ActionChangeEvent {
  value: string,
  index: number
  }

@Component({
  selector: 'se-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {

  @Input()
  values: string[]
  
  @Input()
  label: string

  @Input()
  labelForDropdown: string
  
  @Input()
  disabled: boolean = false
  
  @Output('change')
  changeEvent: EventEmitter<ActionChangeEvent> = new EventEmitter<ActionChangeEvent>()

  public open: boolean = false

  constructor (
    private ref: ElementRef
  ) {
  }

  toggle ($event, value): void {
    if (value)
      this.changeEvent.emit({
        value, index: this.values.indexOf(value)
      })
    this.open = !this.open
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick ($event) {
    if (!this.ref.nativeElement.contains($event.target) && this.open)
      this.toggle($event, undefined)
  }

}
