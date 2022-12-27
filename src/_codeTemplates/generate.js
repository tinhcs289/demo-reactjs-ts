const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'module:list',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './src/_codeTemplates/__module__List/',
    },
    stringReplacers: [{ question: 'Insert module name', slot: '__module__' }],
    output: {
      path: './src/modules/__module__(pascalCase)List',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);
