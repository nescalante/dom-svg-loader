const debug = require('debug');
const sum = require('hash-sum');
const path = require('path');

const log = debug('dom-svg-loader:loader');

module.exports = function loader() {
  const basename = path.basename(this.resourcePath, '.svg');
  const id = sum(this.resourcePath);

  log('Processing file', this.resourcePath);
  log('Using hash', id);

  return `var React = require('react'); var result = function (props) { return React.createElement('svg', Object.assign({ dangerouslySetInnerHTML: { __html: '<use xlink:href="#${basename}-${id}" />' } }, props || {})); }; result.id = '${basename}-${id}'; module.exports = result;`;
};
