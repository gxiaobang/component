/**
 * 表单
 */

import React from 'react';
import classnames from 'classnames';
import { getFormParam } from 'lib/utils';
import './style';


class FormItem extends React.Component {
  render() {
    return (
      <div className="rc-smart-form-item">
        {
          this.props.hasOwnProperty('label') &&
            <div className="rc-smart-form-item-label">{this.props.label}</div>
        }
        {this.props.children}
      </div>
    );
  }
}

class Form extends React.Component {

  static FormItem = FormItem;

  render() {

    const cls = classnames('rc-smart-form', this.props.layout == 'inline' ? `rc-smart-form-inline` : null);

    return (
      <form ref="form" className={cls} method={this.props.method} onSubmit={this.handleSubmit.bind(this)}>
        {this.props.children}
      </form>
    )
  }

  handleSubmit(e) {
    // console.log(arguments);
    e.preventDefault();
    const form = this.refs.form;
    const param = getFormParam(form);

    this.props.onSubmit && this.props.onSubmit(param);
  }
} 

export default Form;