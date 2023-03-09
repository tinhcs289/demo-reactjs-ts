const { codegen } = require('swagger-axios-codegen');
const path = __dirname.split('\\');
const outputDir = path[path.length - 1];
codegen({
  methodNameMode: 'path',
  source: require('./swagger.json'),
  outputDir: `./src/api/${outputDir}`,
});
