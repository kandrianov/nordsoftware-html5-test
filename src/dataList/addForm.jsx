import React, { Component, PropTypes } from 'react';

import StringField from './stringField';
import css from './styles.css';

export default class AddForm extends Component {

  static propTypes = {
    onAddRow: PropTypes.func.isRequired
  }

  state = {
    fullname: {
      value: '',
      valid: false
    },
    email: {
      value: '',
      valid: false,
    },
    phone: {
      value: '',
      valid: false
    }
  }

  onAdd = () => {
    const fullname = this.state.fullname.value;
    const email = this.state.email.value;
    const phone = this.state.phone.value;

    if (this.state.fullname.value && this.state.phone.value && this.state.email.value) {
      this.setState({
        fullname: {
          value: '',
          valid: false
        },
        email: {
          value: '',
          valid: false
        },
        phone: {
          value: '',
          valid: false
        }
      }, () => this.props.onAddRow(fullname, email, phone));
    }
  }

  validate = (value, field) => {
    if (value === '') {
      return false;
    }

    // if (field === 'fullname') {
    //   return /^[a-zA-Z ]+$/.test(value);
    // }

    // if (field === 'email') {
    //   return /\S+@\S+\.\S+/.test(value);
    // }

    // if (field === 'phone') {
    //   return /^\+\d\s+\(\d{1,}\)\s+[0-9-]+$/.test(value);
    // }

    return true;
  }

  onFieldChange = (field) => {
    return (e) => {
      const value = e.target.value;
      this.setState({[field]: {value, valid: this.validate(value, field)}});
    };
  }

  render() {
    const isFormValid = this.state.fullname.valid && this.state.email.valid && this.state.phone.valid;

    return (
        <form className={css.addForm}>
          <StringField
            type="text"
            placeholder="Fullname"
            value={this.state.fullname.value}
            onChange={this.onFieldChange('fullname')}
          />

          <StringField
            type="email"
            placeholder="E-mail address"
            value={this.state.email.value}
            onChange={this.onFieldChange('email')}
          />

          <StringField
            type="text"
            placeholder="Phone"
            value={this.state.phone.value}
            onChange={this.onFieldChange('phone')}
          />

          <div className={css.actions}>
            <div
              className={isFormValid ? css.activeBtn : css.disabledBtn}
              disabled={!isFormValid}
              value="Add new"
              onClick={this.onAdd}>
              Add new
            </div>
          </div>
        </form>
    );
  }
}
