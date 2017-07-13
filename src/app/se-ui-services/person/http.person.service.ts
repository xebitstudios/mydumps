/**
 * file: person.service.ts
 * PersonService: Fetch Person from REST server.
 */
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Person } from './person'
import { PersonService } from './person.service'

// TODO inject
const url = '/server-web-rest-all/persons/myprofile'

@Injectable()
export class HTTPPersonService implements PersonService {

  constructor(
    private _http: Http
  ) {
  }

  fetch(): Promise<Person> {
    return this._http.get(url)
      .map((response: Response) => <Person>response.json())
      .toPromise()
      .catch((err: any) => Promise.reject(err))
  }

}
