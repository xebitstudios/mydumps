/**
 * File: person.ts
 * Interface for Person returned by server as JSON response.
 */

export interface ApplicationInfoBean {
  releaseEnviornment?: string,
  applicationName?: string,
  projectVersion?: string,
  versionWithTimeStamp?: string
}

export interface Person {
  name?: string,
  email?: string,
  jobTitle?: string,
  userRole?: string,
  address?: string,
  pictureURL?: string,
  mobilePhoneNumber?: string,
  workPhoneNumber?: string,
  aboutMeHTML?: string,
  applicationInfoBean?: ApplicationInfoBean,
}
