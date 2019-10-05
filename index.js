const debug = require('debug');
const sum = require('hash-sum');
const humps = require('humps');
const path = require('path');

const log = debug('dom-svg-loader:loader');

module.exports = function loader() {
  const baseName = path.basename(this.resourcePath, '.svg');
  const displayName = `${humps.pascalize(baseName)}Icon`;
  const id = sum(path.relative(process.cwd(), this.resourcePath));

  log('Processing file', this.resourcePath);
  log('Using hash', id);

  return `var React = require('react'); var SVGIcon = function (props) { return React.createElement('svg', props || {}, React.createElement('use', { xlinkHref: '#${baseName}-${id}' })); }; SVGIcon.id = '${baseName}-${id}'; SVGIcon.displayName = '${displayName}'; module.exports = SVGIcon;`;
};
