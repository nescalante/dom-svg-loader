const debug = require('debug');
const sum = require('hash-sum');
const path = require('path');

const log = debug('dom-svg-loader:loader');

module.exports = function loader() {
  const basename = path.basename(this.resourcePath, '.svg');
  const id = sum(path.relative(process.cwd(), this.resourcePath));

  log('Processing file', this.resourcePath);
  log('Using hash', id);

  return `var React = require('react'); var result = function (props) { return React.createElement('svg', props || {}, React.createElement('use', { xlinkHref: '#${basename}-${id}' })); }; result.id = '${basename}-${id}'; module.exports = result;`;
};
