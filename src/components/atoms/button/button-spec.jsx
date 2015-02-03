var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Button', function() {
  var Button = require('./button.jsx');
  var button, mockFn, component;

  beforeEach(function() {
    mockFn = sinon.spy();

    button = TestUtils.renderIntoDocument(
      <Button className='button' action={mockFn} text='bar' />
    );

    component = TestUtils.findRenderedDOMComponentWithClass(
      button, 'button'
    );
  });

  it('renders', function() {

    expect(component).to.exist();
  });

  it('calls the function in the action prop when clicked', function() {
    TestUtils.Simulate.click(component);

    expect(mockFn).to.have.been.called;
  });
});