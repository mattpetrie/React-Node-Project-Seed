var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Header', function() {
  var Header = require('./header.jsx');
  var header;

  beforeEach(function() {
    header = TestUtils.renderIntoDocument(
      <Header />
    );
  });

  it('renders', function() {
    var component = TestUtils.findRenderedDOMComponentWithClass(
      header, 'header'
    );

    expect(component).to.exist();
  });
});