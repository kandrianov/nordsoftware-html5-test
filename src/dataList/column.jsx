import React, { Component, PropTypes } from 'react';

export default class Column extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    sortState: PropTypes.object.isRequired,
    sortKey: PropTypes.string.isRequired,
    toggleDirection: PropTypes.func.isRequired
  }

  render() {
    const {sortState, sortKey, label, toggleDirection} = this.props;

    let arrow;

    if (sortState.key !== sortKey) {
      arrow = '';
    } else {
      if (sortState.direction === 'ASC') {
        arrow = (<span>&darr;</span>);
      } else {
        arrow = (<span>&uarr;</span>);
      }
    }

    return (
      <div onClick={() => toggleDirection(sortKey)}>
        <span>
          {label}
          {arrow}
        </span>
      </div>
    );
  }
}



