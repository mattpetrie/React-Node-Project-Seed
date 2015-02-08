import React from 'react/addons';
import rewire from 'rewire';
import rewireModule from '../../../../test/helpers/rewire-module';
import mockComponent from '../../../../test/helpers/mock-component.jsx';
const TestUtils = React.addons.TestUtils;

var Header = rewire('./header.jsx');

describe('Header', () => {
  rewireModule(Header, {
    Link: mockComponent('link')
  });

  let header;
  let headerText = 'foo';

  beforeEach( () => {
    header = TestUtils.renderIntoDocument(
      <Header headerText={headerText} />
    );
  });

  it('renders', () => {
    let component = TestUtils.findRenderedDOMComponentWithClass(
      header, 'header'
    );

    expect(component).to.exist();
  });

  it('displays the header text', () => {

    expect(header.getDOMNode().innerText).to.contain(headerText);
  });
});