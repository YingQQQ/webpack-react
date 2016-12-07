const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');

let config;

try {
  config = JSON.parse(babelrc);
} catch (e) {
  console.log('Please confirm your babelrc file ');
  console.error(e);
}


require('babel-register')(config);
