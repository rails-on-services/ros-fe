// https://github.com/angular/angular-cli/issues/4318#issuecomment-464160213
const fs = require('fs');

// Configure Angular `environment.ts` file path
const dirPath = `./src/projects/console-app/environments`;
const targetPath = `${dirPath}/environment.ts`;

// Load node modules
const colors = require('colors');
require('dotenv').config();

// Debug environment variables

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `/* autogenerated with \`set-env.ts\` */

export const environment = {
  apiHost: '${process.env.APIHOST ? process.env.APIHOST : 'http://localhost:3000'}',
  production: ${process.env.PRODUCTION ? process.env.PRODUCTION : false},
  preAuth: ${process.env.PREAUTH ? process.env.PREAUTH : false},
  preAuthPath: '${process.env.PREAUTHPATH ? process.env.PREAUTHPATH : '/preauth'}',
  mock: ${process.env.MOCK ? process.env.MOCK : false},
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.mkdirSync(dirPath, { recursive: true });

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
