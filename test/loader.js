const { expect } = require('chai');
const { configure, shallow } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const path = require('path');
const React = require('react');
const compile = require('./helpers/compiler');

configure({ adapter: new Adapter() });

describe('loader', () => {
  let IconComponent;
  let id;

  beforeEach(async () => {
    const config = {
      loader: {
        test: /\.svg$/,
        options: {
          loader: 'dom-svg-loader'
        }
      }
    };

    const stats = await compile('file.svg', config);
    const jsonStats = stats.toJson();
    const { modules } = jsonStats;
    const { source } = modules.find((m) => m.id === './file.svg');
    const result = {};

    id = 'file-6e608b10';

    // execute
    new Function('require', 'module', `'use strict'\n${source}`)(
      require,
      result
    );

    IconComponent = result.exports;
  });

  it('should return id', () => {
    expect(IconComponent.id).to.equal(id);
  });

  it('should return displayName', () => {
    expect(IconComponent.displayName).to.equal('FileIcon');
  });

  it('should build the component', () => {
    const iconComponent = shallow(React.createElement(IconComponent));
    const useComponent = iconComponent.find('svg > use');

    expect(useComponent.exists()).to.equal(true);
    expect(useComponent.prop('xlinkHref')).to.equal(`#${id}`);
  });
});
