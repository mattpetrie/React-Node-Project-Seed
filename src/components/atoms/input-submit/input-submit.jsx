import './input-submit.less';

import React from 'react/addons';

const InputSubmit = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
  },

  render: function() {
    return (
      <input type='submit' className='input-submit' value={this.props.value} />
    );
  }
});

export default InputSubmit;
