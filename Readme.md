# DOM SVG Loader

Do `require('.svg')` in Node and the browser

## Install

```
npm install dom-svg-loader
```

## Usage

`dom-svg-loader` will inject svgs required in the dom as "symbols", and then will use a reference to those icons from the required elements

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
  return <MyIcon />;
};
```

Will output:

```html
<svg><use xlink:href="#my-icon-abcd1234" /></svg>
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

Will output:

```html
<!DOCTYPE html>
<html>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0;visibility:hidden">
    <defs>
      <symbol id="documentation-medium">
        <svg>
          <my svg element>
        </svg>
      </symbol>
    </defs>
  </svg>
  <svg><use xlink:href="#my-icon-abcd1234" /></svg>
</body>
</html>
```

## License

MIT
