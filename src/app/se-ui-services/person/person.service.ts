/**
 * file: notifications.provider.ts
 * NotificationsProvider: Interface for fetching notifications.
 * TODO -- Other operations like Read/viewd, clear should be placed here.
 */

import { Person } from './person'

export class PersonService {

  /**
   * Fetch the person information
   */
  fetch(): Promise<Person> {
    throw `PersonService: fetch not implemented`
  }

}
