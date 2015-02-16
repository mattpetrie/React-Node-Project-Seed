import React from 'react/addons';
import rewire from 'rewire';
import rewireModule from '../../test/helpers/rewire-module';
import mockComponent from '../../test/helpers/mock-component.jsx'

const TestUtils = React.addons.TestUtils;

describe('App', () => {
  const App = rewire('./app.jsx');
  let app;

  rewireModule(App, {
    RouteHandler: mockComponent('route-handler'),
  });

  beforeEach( () => {
    app = TestUtils.renderIntoDocument(
      <App />
    );
  });

  it('renders',  () => {
    let component = TestUtils.findRenderedDOMComponentWithClass(
      app, 'App'
    );

    expect(component).to.exist();
  });

  it('renders the Route Handler', () => {
    let routeHandler = TestUtils.findRenderedDOMComponentWithClass(
      app, 'route-handler'
    );

    expect(routeHandler).to.exist();
  });
});