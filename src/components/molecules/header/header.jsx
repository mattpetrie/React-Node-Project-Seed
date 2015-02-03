import './header.scss';

import React from 'react/addons';

var Header = React.createClass({

  render: function() {
    return (
      <div className="header">
        <h1>React + Flux Todos</h1>
      </div>
    );
  }
});

export default Header;
