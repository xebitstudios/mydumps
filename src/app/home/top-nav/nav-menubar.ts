export default {
  'navMenubarmodel': [
    {
      'label': 'CUSTOMER DB',
      'id': 'menuAccounts',
      'routerLinkActive': 'active',
      'routerLink': '/customer',
      'menuItems': []
    }, {
      'label': 'OTHER MICROSERVICE',
      'id': 'profile-profile',
      'menuItems': [{
        'label': 'Opportunities',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/opportunities',
        'id': 'prepare-opportunities'
      }, {
        'label': 'Opportunities1',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/opportunities1',
        'id': 'prepare-opportunities1'
      }]
    },
    {
      'label': 'Comp',
      'routerLinkActive': 'active',
      'routerLink': '/user/compensation',
      'id': 'profile-compensation'
    }
  ],
  'userProfileMenumodel': [
    {
      'label': 'Profile',
      'routerLinkActive': 'active',
      'routerLink': '/user/profile',
      'id': 'profile-profile'
    },
    {
      'label': 'Comp',
      'routerLinkActive': 'active',
      'routerLink': '/user/compensation',
      'id': 'profile-compensation'
    },
  ],
} 
