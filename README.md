[![CircleCI](https://circleci.com/gh/rails-on-services/ros-fe.svg?style=svg)](https://circleci.com/gh/rails-on-services/ros-fe)
# Ros-fe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

Demo: http://console.ros.rails-on-services.org/

## Tooling Requirements
* [angular CLI](https://angular.io/guide/quickstart)
* [node 10+](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/en/)

## Getting started

Run `yarn install` to install dependencies

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `yarn build:prod` flag for a production build.

## Development
### Environment Variables

the environment variables are set on `yarn start|build`.

you can set new variables in `/set-env.ts` and set defaults unless overridden in run scripts in `/package.json`

### Feature Flags

Add/modify new flags in `/path/to/services/feature-flags.service.ts`. Flags should be set based on environment.

To use feature flags in your component:
``` 
### component.ts
import { FeatureFlagsService } from '/path/to/services/feature-flags.service';

  featureSet: {
    foo: [true|false],
  };
  
  constructor(private featureFlags: FeatureFlagsService) {
      this.featureSet = featureFlags;
  }
```
```
### component.html
<div *ngIf="featureSet.foo; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>
  <p>content to render if true</p>
</ng-template>

<ng-template #elseBlock>
  <p>content to render if false</p>
</ng-template>

```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
