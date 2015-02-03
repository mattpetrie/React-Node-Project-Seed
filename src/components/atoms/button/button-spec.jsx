import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import Button from './button.jsx';

describe('Button', () => {
  let button, mockFn, component;

  beforeEach( () => {
    mockFn = sinon.spy();

    button = TestUtils.renderIntoDocument(
      <Button className='button' action={mockFn} text='bar' />
    );

    component = TestUtils.findRenderedDOMComponentWithClass(
      button, 'button'
    );
  });

  it('renders', () => {

    expect(component).to.exist();
  });

  it('calls the function in the action prop when clicked', () => {
    TestUtils.Simulate.click(component);

    expect(mockFn).to.have.been.called;
  });
});