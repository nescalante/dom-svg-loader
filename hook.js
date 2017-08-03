const sprites = require('./sprites');

require.extensions['.svg'] = function svgHook(m, filename) {
  // eslint-disable-next-line no-param-reassign
  m.exports = sprites.add(filename);
};
