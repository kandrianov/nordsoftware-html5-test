import React, { Component, PropTypes } from 'react';

export default class StringField extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const {type, value, placeholder, onChange} = this.props;
    return (
      <div>
        <input
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }
}
