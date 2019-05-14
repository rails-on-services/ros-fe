import { InjectionToken } from '@angular/core';

export const CORE_SERVICES_MENU = new InjectionToken<any>('CORE_SERVICES_MENU');

export const coreServicesMenuValue =  [
  { url: '/dashboard', title: 'Dashboard' },
  { url: '/iam', title: 'IAM' },
  { url: '/cognito', title: 'Cognito' },
  { url: '/comms', title: 'Comms' }
]
