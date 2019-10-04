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
  }
];
```

### Code

#### Before everything

```javascript
require('dom-svg-loader/hook');
require('./my-app');
```

#### Some random component

```javascript
import React from 'react';
import MyIcon from './svg/my-icon.svg';

export default const mySvg = () => {
  return (<MyIcon />);
};
```

#### The render method

```javascript
import sprites from 'dom-svg-loader/sprites';
import ReactDOM from 'react-dom/server';

export default async function html() {
  const spriteContent = await sprites.render();

  `
    <!DOCTYPE html>
    <html>
    <body>
      ${spriteContent}
      ${ReactDOM.renderToString(mySvg())}
    </body>
    </html>
  `;
}
```

## License

MIT
