import React, { Component } from 'react';

import List from './list';
import AddForm from './addForm';
import Column from './column';
import { sort } from './utils';
import css from './styles.css';

export default class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: sort(props.rows, {key: 'fullname', direction: 'ASC'}),
      nextId: props.rows.length,
      sortState: props.sortState
    }
  }

  toggleDirection = (newSortKey) => {
    let direction;
    if (this.state.sortState.key === newSortKey) {
      direction = this.state.sortState.direction === 'ASC' ? 'DESC' : 'ASC';
    } else {
      direction = 'ASC';
    }

    const sortState = { key: newSortKey, direction };

    return this.setState({
      sortState,
      rows: sort(this.state.rows, sortState)
    });
  }

  onAddRow = (fullname, email, phone) => {
    const id = this.state.nextId;
    const rows = [{
          id,
          fullname,
          email,
          phone
        },
        ...this.state.rows
    ];

    return this.setState({
      rows: sort(rows, this.state.sortState),
      nextId: id + 1
    });
  }

  onEditRow = (rowId) => {
    return (fields) => {
      const rows = this.state.rows.map(row => {
          if (row.id === rowId) {
            return Object.assign({}, row, {...fields});
          } else {
            return row;
          }
      });

      return this.setState({
        rows: sort(rows, this.state.sortState)
      });
    };
  }

  onDeleteRow = (rowId) => {
    return () => {
      this.setState({
        rows: this.state.rows.filter(row => row.id !== rowId)
      });
    };
  }

  render() {
    return (
      <div className={css.box}>
        <AddForm
          onSubmit={this.onAddRow}
          onAddRow={this.onAddRow}
        />

        <div className={css.columns}>
          <Column
            label="Name"
            sortState={this.state.sortState}
            sortKey="fullname"
            toggleDirection={this.toggleDirection}
          />
          <Column
            label="E-mail address"
            sortState={this.state.sortState}
            sortKey="email"
            toggleDirection={this.toggleDirection}
          />
          <Column
            label="Phone number"
            sortState={this.state.sortState}
            sortKey="phone"
            toggleDirection={this.toggleDirection}
          />
          <div className={css.actions}></div>
        </div>

        <List
          rows={this.state.rows}
          onDeleteRow={this.onDeleteRow}
          onEditRow={this.onEditRow}
          toggleDirection={this.toggleDirection}
          sortState={this.state.sortState}
        />
      </div>
    );
  }
}
