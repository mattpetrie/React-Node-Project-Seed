import './header.less';

import React from 'react/addons';
import {Link} from 'react-router';

var Header = React.createClass({

  propTypes: {
    headerText: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="header">
        <h1>{this.props.headerText}</h1>
        <ul>
          <li><Link to='todo-app'>App</Link></li>
          <li><Link to='about'>About</Link></li>
        </ul>
      </div>
    );
  }
});

export default Header;
