# DOM SVG Loader

Do `require('.svg')` in Node and the browser

## Install

```
npm install dom-svg-loader
```

## Usage

### Webpack

```javascript
loaders: [
  {
    test: /\.svg$/,
    loader: 'dom-svg-loader'
  },
]
```

### Code

#### Before everything

```javascript
require('dom-svg-loader/hook');
require('./my-app');
```

#### Some random component

```javascript
import code from '@mulesoft/anypoint-icons/lib/svg/code.svg';

export default const mySvg = () => {
  return (<svg><use xlinkHref={`#${code.id}`} /></svg>);
};
```

#### The render method

```javascript
import sprites from 'dom-svg-loader/sprites';
import ReactDOM from 'react-dom/server';

const spriteContent = sprites.render();

export default function html() {
  `
    <!DOCTYPE html>
    <html>
    <body>
      ${spriteContent}
      ${ReactDOM.renderToString(mySvg())}
    </body>
    </html>
  `
}
```

## License

MIT
