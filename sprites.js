const path = require('path');
const fs = require('fs');

const symbols = [];
const styles = ['position:absolute', 'width:0', 'height:0', 'visibility:hidden'];

function add(filename) {
  const id = path.basename(filename, '.svg');
  const file = fs.readFileSync(filename).toString()
    .replace(/^<svg/, `<symbol id="${id}"`)
    .replace('xmlns="http://www.w3.org/2000/svg" ', '', 'g')
    .replace(/\/svg>$/, '/symbol>');

  symbols.push(file);

  return {
    id,
  };
}

function render() {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="${styles.join(';')}">`,
    '<defs>',
    symbols.join(''),
    '</defs>',
    '</svg>',
  ].join('');
}

module.exports = {
  add,
  render,
};
