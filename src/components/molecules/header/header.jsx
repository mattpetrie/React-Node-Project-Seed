require('./header.scss');

var React = require('react/addons');

var Header = React.createClass({

  render: function() {
    return (
      <div className="header">
        <h1>React + Flux Todos</h1>
      </div>
    );
  }
});

module.exports = Header;