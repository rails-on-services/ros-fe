# Essential reading
Please read the [Coding Guidelines](coding-guidelines.md) before starting

# Instructions
Download dependencies
```bash
yarn
```

Global build
```bash
yarn build
```

Global test
```
yarn test-ci
```

# Philosophy
* Reusable components seat under libs.
* Deployable apps seat under apps.
* Currently it is on the base one app per microsite.
* Apps should mostly be basic wrappers which style and aggregate the components in a coherent routable app.

# Rules
* Components in libs should not use any router feature.
* Components in libs should instead trigger events, that should be caught by the parent app to update the routing if necessary.


# Enabling login functionality

 * Create `backend/apputh-server/config.json` with the following format. Ask someone for the secrets
     ```json
     {
      "endpoints": {
        "microsite.perxtech.org": {
          "target_url": "https://whistler-api-dev.perxtech.org/cognito/users",
          "account_id": "2"
        },
        "localhost:4200": {
          "target_url": "https://api.perxtech.io",
          "account_id": "3"
        }
      },
      "credentials": {
        "2": {
          "perx_access_key_id": "",
          "perx_secret_access_key": ""
        },
        "3": {
          "perx_access_key_id": "",
          "perx_secret_access_key": ""
        }
      }
    }
     ```
 * Run the node server for login api capability
 * `apps/{app}/src/environments` should have at minimum
   ```js
   export const environment = {
      apiHost: 'https://api.perxtech.io',
      production: false,
      preAuthPath: '/preauth',
      preAuth: false,
    };
   ```
 * In `apps/{app}/src/app/app.module.ts` add these 3 modules
   ```js
    @NgModule({
    imports: [
        ...
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
        AuthenticationModule,
        ],
    ...
    })

   ```

## Local Deployment

Doing this allows you to emulate your build on the server. It does not live reload because it is set up for server side rendering.

to build the prudential shake the tree app:
```
docker build -t microsite-apps-ng . --build-arg app=prudential
```


we expose port 8000 in the dockerfile 
```
docker run -p 8000:8000 --name microsite-apps-ng microsite-apps-ng 
```

you should have the server now listening on `http://localhost:8000

to find the process list
```
docker ps -a
```

to kill the process

```
docker rm processname

```
