import {
  Directive, ElementRef, EventEmitter, Inject, Input, Output,
  OnChanges, OnInit, SimpleChanges
} from '@angular/core'
import { DOCUMENT } from '@angular/platform-browser'
import { SVGCache } from './svg-cache.service'

@Directive({
  selector: '[se-svg]',
  providers: [SVGCache]
})
export class SVGDirective implements OnInit, OnChanges {

  @Input('se-svg') svg: string
  @Input() replaceContents: boolean = true
  @Input() cacheSVG: boolean = true
  @Input() removeAttributes: Array<string>
  @Output() onSVGInserted: EventEmitter<SVGElement> = new EventEmitter<SVGElement>()

  private url: string

  constructor(
    @Inject(DOCUMENT) private document,
    private el: ElementRef,
    private cache: SVGCache
  ) {
  }

  ngOnInit(): void {
    this.insert()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['se-svg'])
      this.insert()
  }

  private insert(): void {
    // assert URL provided
    if (!this.svg) {
      console.error(`SVG Directive: Missing required URL`)
      return
    }

    // symbol id
    if (this.svg.charAt(0) === '#' || this.svg.indexOf('.svg#') > -1) {
      this.insertLink()
      return
    }

    // skip if url hasn't changed
    const url = this.svg
    if (url === this.url)
      return

    this.url = url
    // Fetch SVG via cache mechanism
    this.cache.getSVG(this.url, this.cacheSVG).subscribe((svg: SVGElement) => {
        if (svg && this.el.nativeElement) {
          if (this.replaceContents)
            this.el.nativeElement.innerHTML = ''
          if (this.removeAttributes)
            this.removeAllAttributes(svg, this.removeAttributes)
          this.el.nativeElement.appendChild(svg)
          this.onSVGInserted.emit(svg)
        }
      }, (err: any) => {
        console.error(err)
      })
  }

  private insertLink(): void {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const el_use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    el_use.setAttribute('xlink:href', this.svg)
    el.appendChild(el_use)
    if (this.replaceContents)
      this.el.nativeElement.innerHTML = ''
    this.el.nativeElement.appendChild(el)
    this.onSVGInserted.emit(el)
  }

  private getAbsoluteUrl(url: string): string {
    const base = this.document.createElement('base') as HTMLBaseElement
    return base.href = url
  }

  private removeAllAttributes(svg: SVGElement, attrs: Array<string>) {
    const innerEls = svg.getElementsByTagName('*')
    for (let i = 0; i < innerEls.length; i++) {
      const elAttrs = innerEls[i].attributes
      for (let j = 0; j < elAttrs.length; j++) {
        if (attrs.indexOf(elAttrs[j].name.toLowerCase()) > -1)
          innerEls[i].removeAttribute(elAttrs[j].name)
      }
    }
  }
}
