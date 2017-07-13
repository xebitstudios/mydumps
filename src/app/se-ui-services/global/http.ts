import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers, Request, RequestOptionsArgs, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class NonCachingRequestOptions extends RequestOptions {
  header = new Headers({
    'Cache-Control': 'not-store, no-cache',
    'Pragma': 'no-cache Expires: 0',
  })
} 

@Injectable()
export class HttpCachable {

  static cache: { [key: string]: Response } = {}
  static pending: string[] = []

  constructor(
    private http: Http
  ) {
  }

  /**
   * Invalidate a cached response.
   * @param {string} url
   * @param {number} delay - Optional delay factor in milliseconds before cache invalidated
   */
  invalidate(url: string, delay: number = 0) {
    // don't que up another timeout caller if we're already set to invalidate this url
    if (HttpCachable.pending.indexOf(url) > -1)
      return
    HttpCachable.pending.push(url)
    setTimeout(() => {
      console.log(`HttpCachable invalidating ${url}`)
      HttpCachable.pending.splice(HttpCachable.pending.indexOf(url), 1)
      delete HttpCachable.cache[url]
    }, delay)
  }

  /**
   * Performs a cachable request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log(`HttpCachable GET request`, { url, options })
    if (url in HttpCachable.cache)
      return Observable.of(HttpCachable.cache[url])
    return this.http.get(url, options)
      .map(response => {
        console.log(`HttpCachable GET response`, { url, options, response })
        HttpCachable.cache[url] = response 
        return response
      })
  }

  /**
   * POST operation is not cachable.
   * This method provides HTTP passthrough.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, options)
  }

  /**
   * PUT operation is not cachable.
   * This method provides HTTP passthrough.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, options)
  }

  /**
   * DELETE operation is not cachable.
   * This method provides HTTP passthrough.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, options)
  }

  /**
   * PATCH operation is not cachable.
   * This method provides HTTP passthrough.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, options)
  }

  /**
   * HEAD operation is not cachable.
   * This method provides HTTP passthrough.
   */
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(url, options)
  }

  /**
   * OPTIONS operation is not cachable.
   * This method provides HTTP passthrough.
   */
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.options(url, options)
  }

}
