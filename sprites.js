const debug = require('debug');
const fs = require('fs');
const sum = require('hash-sum');
const humps = require('humps');
const path = require('path');
const React = require('react');
const SVGO = require('svgo');

let renderedSymbols = async () => '';
const symbols = [];
const styles = [
  'position:absolute',
  'width:0',
  'height:0',
  'visibility:hidden'
];
const style = styles.join(';');
const svgo = new SVGO({
  plugins: [
    {
      removeXMLNS: true
    }
  ]
});
const log = debug('dom-svg-loader:server');

function add(filename) {
  const id = sum(path.relative(process.cwd(), filename));
  const baseName = path.basename(filename, '.svg');

  log('Processing file', filename);
  log('Using hash', id);

  const content = fs.readFileSync(filename).toString();

  if (!symbols.some((symbol) => symbol.id === id)) {
    const svgContent = svgo.optimize(content, {
      path: filename
    });
    symbols.push({ content: svgContent, id, baseName, filename });

    const newContent = symbols.reduce(async (acum, symbol) => {
      let defs = await acum;
      const symbolData = (await symbol.content).data;

      defs += `<symbol id="${symbol.baseName}-${symbol.id}">`;
      defs += symbolData;
      defs += '</symbol>';

      return defs;
    }, Promise.resolve(''));

    renderedSymbols = () => newContent;
  } else {
    log('Ignoring already processed', filename);
    log('with hash', id);
  }

  const SVGIcon = (props) =>
    React.createElement(
      'svg',
      props || {},
      React.createElement('use', { xlinkHref: `#${baseName}-${id}` })
    );

  SVGIcon.id = `${baseName}-${id}`;
  SVGIcon.displayName = `${humps.pascalize(baseName)}Icon`;

  return SVGIcon;
}

async function render() {
  const defs = await renderedSymbols();

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="${style}">`,
    '<defs>',
    defs,
    '</defs>',
    '</svg>'
  ].join('');
}

module.exports = {
  add,
  render
};
