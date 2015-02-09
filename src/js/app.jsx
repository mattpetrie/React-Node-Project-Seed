import '../stylesheets/main.less';

import React from 'react/addons';
import Router from 'react-router';

var RouteHandler = Router.RouteHandler;

const App = React.createClass({

  render: function() {
    return (
      <div className='App'>
        <RouteHandler />
      </div>
    )
  }
})

export default App
