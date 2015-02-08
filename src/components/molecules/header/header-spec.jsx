import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

import Header from './header.jsx';

describe('Header', () => {
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