const debug = require('debug');
const sum = require('hash-sum');

const log = debug('dom-svg-loader:loader');

module.exports = function loader() {
  const id = sum(this.resourcePath);

  log('Processing file', this.resourcePath);
  log('Using hash', id);

  return `const React = require('react'); module.exports = function () { return React.createElement('svg', {}, React.createElement('use', { xlinkHref: '#icon-${id}' })); };`;
};
