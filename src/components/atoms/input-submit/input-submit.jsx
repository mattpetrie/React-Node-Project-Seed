require('./input-submit.scss');

var React = require('react/addons');

var InputSubmit = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
  },

  render: function() {
    return (
      <input type='submit' className='input-submit' value={this.props.value} />
    );
  }
});

module.exports = InputSubmit;