/* Returns a React component for mocking consisting of an empty div
with the class name passed in */

var React = require('react/addons');

function mockComponent(componentClass) {
  return React.createClass({
    getInitialState: function() {
      return { testing: true }
    },
    render: function() {
      return (
        <div className={componentClass}>
          {this.props.children}
        </div>
      );
    }
  });
}

module.exports = mockComponent;