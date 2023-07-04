const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'module:form',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: `.codegen/Form__module__/`,
    },
    stringReplacers: [{ question: 'Insert module name', slot: '__module__' }],
    dynamicReplacers: [{ slot: '//@ts-nocheck --entire-file', slotValue: '' }],
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
    dynamicReplacers: [{ slot: '//@ts-nocheck --entire-file', slotValue: '' }],
    output: {
      path: `./src/modules/Table__module__(pascalCase)`,
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
  {
    option: 'module:input',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: `.codegen/Common__module__Field/`,
    },
    stringReplacers: [{ question: 'Insert module name', slot: '__module__' }],
    dynamicReplacers: [{ slot: '//@ts-nocheck --entire-file', slotValue: '' }],
    output: {
      path: `./src/components/inputs/Common__module__(pascalCase)Field`,
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);
