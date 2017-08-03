const path = require('path');

module.exports = function loader() {
  return `module.exports = { id: '${path.basename(this.resourcePath, '.svg')}' }`;
};
