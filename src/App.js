import React, { Component } from 'react';

import DataList from './dataList';
import logotype from './logotype.svg'
import participants from './data/participants.json';
import css from './App.css';

export default class App extends Component {
  render() {
    return (
      <div className={css.app}>
        <div className={css.header}>
          <div className={css.logotype}>
            <img src={logotype} alt="Nord Software" />
            <span>Nord Software</span>
          </div>
        </div>
        <div className={css.content}>
          <h1>List of participants</h1>

          <DataList
            rows={participants}
            sortState={{key: 'fullname', direction: 'ASC'}}
          />

        </div>
      </div>
    );
  }
}
