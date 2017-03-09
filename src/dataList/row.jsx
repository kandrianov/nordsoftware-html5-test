import React, { Component, PropTypes } from 'react';

import deleteIcon from './assets/delete.svg';
import editIcon from './assets/edit.svg';
import StringField from './stringField';
import css from './styles.css';

export default class Row extends Component {

  static propTypes = {
    onEditRow: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  setEditMode = () => {
    this.setState({
      editing: true,
      fullname: {
        value: this.props.fullname,
        valid: true
      },
      email: {
        value: this.props.email,
        valid: true,
      },
      phone: {
        value: this.props.phone,
        valid: true
      }
    });
  }

  cancel = () => this.setState({ editing: false })

  validate = (value, field) => {
    if (value === '') {
      return false;
    }
    return true;
  }

  fieldChange = (field) => {
    return (e) => {
      const value = e.target.value;
      this.setState({[field]: {value, valid: this.validate(value, field)}});
    };
  }

  isFormValid = () => {
    return this.state.fullname.valid && this.state.email.valid && this.state.phone.valid;
  }

  save = () => {
    if (this.isFormValid()) {
      return this.setState({
        editing: false
      }, () => this.props.onEditRow({
        fullname: this.state.fullname.value,
        email: this.state.email.value,
        phone: this.state.phone.value
      }))
    }
    return false;
  }

  render() {
    return this.state.editing === false ?
    (
      <div className={css.row}>
        <div><span title={this.props.fullname}>{this.props.fullname}</span></div>
        <div><span title={this.props.email}>{this.props.email}</span></div>
        <div><span title={this.props.phone}>{this.props.phone}</span></div>
        <div className={css.actions}>
          <div onClick={this.props.onDeleteRow}>
            <img src={deleteIcon} alt="Delete" />
          </div>

          <div onClick={this.setEditMode}>
            <img src={editIcon} alt="Edit" />
          </div>
        </div>
      </div>

    ) :
    (
      <form className={css.row}>

        <StringField
          type="text"
          placeholder="Fullname"
          value={this.state.fullname.value}
          onChange={this.fieldChange('fullname')}
        />

        <StringField
          type="email"
          placeholder="E-mail address"
          value={this.state.email.value}
          onChange={this.fieldChange('email')}
        />

        <StringField
          type="text"
          placeholder="Phone"
          value={this.state.phone.value}
          onChange={this.fieldChange('phone')}
        />

        <div className={css.actions}>
          <div className={this.isFormValid() ? css.activeBtn : css.disabledBtn} onClick={this.save}>Save</div>
          <div className={css.btn} onClick={this.cancel}>Cancel</div>
        </div>
      </form>
    );
  }
}
