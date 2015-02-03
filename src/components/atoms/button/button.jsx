require('./button.scss');

var React = require('react/addons');

var Button = React.createClass({

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

module.exports = Button;