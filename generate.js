const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'module:list',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './src/modules/__module__List/',
    },
    stringReplacers: [{ question: 'Insert module name', slot: '__module__' }],
    output: {
      path: './src/modules/__module__(pascalCase)List',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: true,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);
