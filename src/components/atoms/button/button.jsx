import './button.less';

import React from 'react/addons';

const Button = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    action: React.PropTypes.func,
    text: React.PropTypes.string,
  },

  render: function() {
    return(
      <button className={this.props.className} onClick={this.props.action}>
        {this.props.text}
      </button>
    );
  }
});

export default Button;
