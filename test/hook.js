const { expect } = require('chai');
const { configure, shallow } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const path = require('path');
const React = require('react');
const sprites = require('../sprites');

configure({ adapter: new Adapter() });

describe('hook', () => {
  let IconComponent;
  let id;

  beforeEach(async () => {
    require('../hook');
    IconComponent = require('./fixtures/file.svg');
    id = 'file-6e608b10';
  });

  afterEach(() => {
    delete require.extensions['.svg'];
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

  it('should render sprites', async () => {
    expect(await sprites.render()).to.eql(
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0;visibility:hidden"><defs><symbol id="file-6e608b10"><svg width="75" height="75"><rect width="100%" height="100%" fill="red"/></svg></symbol></defs></svg>`
    );
  });
});
