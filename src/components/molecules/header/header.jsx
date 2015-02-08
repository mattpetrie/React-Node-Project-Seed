import './header.scss';

import React from 'react/addons';

var Header = React.createClass({

  propTypes: {
    headerText: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="header">
        <h1>{this.props.headerText}</h1>
      </div>
    );
  }
});

export default Header;
