require('./card.scss');

var React = require('react/addons');

var Card = React.createClass({

  render: function() {
    return (
      <div className='card'>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Card;