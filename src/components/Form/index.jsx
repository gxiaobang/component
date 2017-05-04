/**
 * 表单
 * @example
 *   <Form>
 *     <FormItem label="名称">
 *       <Input />
 *     </FormItem>
 *   </Form>
 */

import React from 'react';
import classnames from 'classnames';
import { getFormParam } from 'utils';
import Validate from 'components/Validate';
import _ from 'lodash';
import './style';

const { Validator } = Validate;


class FormItem extends React.Component {
  render() {
    const cls = classnames('rc-smart-form-item', this.props.className);

    return (
      <div className={cls}>
        {
          this.props.hasOwnProperty('label') &&
            <label className="rc-smart-form-item-label">{this.props.label}</label>
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

    const rules = {};
    _.forEach(form.elements, element => {
      // console.log(element)
      const name = element.name;
      const rule = element.getAttribute('data-rules');
      if (name && rule) {
        rules[ name ] = rule;
      }
    });

    const validation = new Validator(param, rules);
    if (validation.passes()) {
      console.log('验证通过');
      this.props.onSubmit && this.props.onSubmit(param);
    }
    else {
      console.log('验证不通过');
    }

    // this.props.onSubmit && this.props.onSubmit(param);
  }
} 

export default Form;