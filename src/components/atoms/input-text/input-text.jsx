require('./input-text.scss');

var React = require('react/addons');

var InputText = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },

  render: function() {
    return (
      <input className='input-text' type='text' name={this.props.name} value={this.props.value}
        placeholder={this.props.placeholder} onChange={this.props.onChange} />
    );
  }
});

module.exports = InputText;