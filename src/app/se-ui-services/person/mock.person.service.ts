import { Injectable } from '@angular/core'
import { Person } from './person'
import { PersonService } from './person.service'
import mockPerson from './mock.person'

/**
 * Mock Person Provider
 */
@Injectable()
export class MockPersonService implements PersonService {

  fetch(): Promise<Person> {
    return Promise.resolve(mockPerson)
  }

}
