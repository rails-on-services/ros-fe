const { exportToIndex, getDefaultExcludesNames } = require('./export-to-index');

const defaultExcludesNames = getDefaultExcludesNames();

exportToIndex({
  excludesNames: [
    ...defaultExcludesNames,
    '/src/library'
  ]
});

exportToIndex({
  indexDir: './src/library/open-ui-components',
  srcDir: './src/library/open-ui-components'
});

// exportToIndex({
//   indexDir: './src/library/open-services',
//   srcDir: './src/library/open-services'
// });
