const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'module:form',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: `.codegen/Form__module__/`,
    },
    stringReplacers: [{ question: 'Insert module name', slot: '__module__' }],
    output: {
      path: `./src/modules/Form__module__(pascalCase)`,
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
  {
    option: 'module:table',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: `.codegen/Table__module__/`,
    },
    stringReplacers: [{ question: 'Insert module name', slot: '__module__' }],
    output: {
      path: `./src/modules/Table__module__(pascalCase)`,
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);
