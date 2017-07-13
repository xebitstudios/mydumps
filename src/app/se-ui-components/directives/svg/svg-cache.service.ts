import { Inject, Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { DOCUMENT } from '@angular/platform-browser'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'

@Injectable()
export class SVGCache {

  private static cache: Map<string, SVGElement>
  private static pendingRequests: Map<string, Observable<SVGElement>>

  constructor(
    @Inject(DOCUMENT) private document,
    private http: Http
  ) {
    if (!SVGCache.cache)
      SVGCache.cache = new Map<string, SVGElement>()
    if (!SVGCache.pendingRequests)
      SVGCache.pendingRequests = new Map<string, Observable<SVGElement>>()
  }

  getSVG(url: string, cache: boolean = true): Observable<SVGElement> {
    // use cached copy if exists
    if (cache && SVGCache.cache.has(url))
      return Observable.of(this.cloneSVG(SVGCache.cache.get(url)))

    // fetch in progress
    if (SVGCache.pendingRequests.has(url))
      return SVGCache.pendingRequests.get(url)

    // dispatch fetch
    const req = this.http.get(url)
      .map((res: Response) => res.text())
      .catch((err: any) => err)
      .finally(() => {
        SVGCache.pendingRequests.delete(url)
      })
      .share()
      .map((text: string) => {
        const el = this.svgElementFromText(text)
        SVGCache.cache.set(url, el)
        return this.cloneSVG(el)
      });
    SVGCache.pendingRequests.set(url, req)
    return req
  }

  private svgElementFromText(text: string): SVGElement | never {
    const div: HTMLElement = this.document.createElement('div')
    div.innerHTML = text
    const svg = div.querySelector('svg') as SVGElement
    if (!svg)
      throw new Error(`SVG not found`)
    return svg
  }

  private cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement
  }

}
