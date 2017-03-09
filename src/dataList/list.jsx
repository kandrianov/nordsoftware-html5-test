import React, { Component, PropTypes } from 'react';

import Row from './row';
import css from './styles.css';

export default class List extends Component {

  static propTypes = {
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fullname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
      })
    ).isRequired,
    onEditRow: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired
  }

  render() {
    const { onEditRow, onDeleteRow } = this.props;

    const rows = this.props.rows.map((row, i) => {
      const { id, fullname, email, phone } = row;

      return (
        <Row
          key={id}
          fullname={fullname}
          email={email}
          phone={phone}
          onEditRow={onEditRow(row.id)}
          onDeleteRow={onDeleteRow(row.id)}
        />
      );
    });

    return (
      <div className={css.list}>
        {rows}
      </div>
    );
  }
}
