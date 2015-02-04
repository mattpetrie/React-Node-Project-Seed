import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

import Header from './header.jsx';

describe('Header', () => {
  let header;

  beforeEach( () => {
    header = TestUtils.renderIntoDocument(
      <Header />
    );
  });

  it('renders', () => {
    let component = TestUtils.findRenderedDOMComponentWithClass(
      header, 'header'
    );

    expect(component).to.exist();
  });
});