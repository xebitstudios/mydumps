import { Injectable } from '@angular/core'
// import { Router, NavigationEnd } from '@angular/router'

import 'rxjs/add/operator/filter'

/**
 * Simple analytics service used for tracking router events.
 */
@Injectable()
export class Analytics {

  private enabled: boolean

  constructor(
    // private router: Router
  ) {
    this.enabled = false
  }

  /**
   * subscribe to router events. call only once.
   */
  trackPageViews() {
    if (!this.enabled) {
      console.log(`Analytics: tracking page views is not enabled`)
      return
    }
    // this.router.events.filter((event) => event instanceof NavigationEnd).subscribe(() => {
    //   console.log(`Analytics: track page view`, event)
    // })
  }

  /**
   * track an event.
   */
  trackEvent(action: string, category: string) {
    if (!this.enabled) {
      return
    }
    console.log(`Analytics: track event`, { eventCategory: category, eventAction: action })
  }

}
