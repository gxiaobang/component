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
import { Message } from 'components';
import VerifyStore from 'stores/verify';
import _ from 'lodash';
import './style';

const { Validator } = Validate;

class FormItem extends React.Component {
  
  static childContextTypes = {
    label: React.PropTypes.string
  }

  getChildContext() {
    return { label: this.props.label }
  }

  render() {
    const { label, className, required } = this.props;
    const cls = classnames('form-item', className);

    return (
      <div className={cls}>
        {
          label &&
            <label className={classnames('form-item-label', required && 'required')}>{label}</label>
        }
        {this.props.children}
      </div>
    );
  }
}

// 组
class FormItemGroup extends React.Component {
  render() {
    return (
      <div className="form-item-group">{this.props.children}</div>
    );
  }
}

class Form extends React.Component {

  static FormItem = FormItem;

  static FormItemGroup = FormItemGroup;

  verifyStore = new VerifyStore();

  static childContextTypes = {
    verifyStore: React.PropTypes.object
  }

  getChildContext() {
    return { verifyStore: this.verifyStore }
  }

  // 获取表单数据
  getFormParam() {
    const form = this.refs.form;
    return getFormParam(form);
  }

  render() {

    const cls = classnames('form', this.props.layout == 'inline' ? 'form-inline' : null);

    return (
      <form ref="form" className={cls} method={this.props.method} action="javascript:;" onSubmit={this.handleSubmit.bind(this)}>
        {this.props.children}
      </form>
    )
  }

  handleSubmit(e) {
    const form = this.refs.form;
    const param = this.getFormParam();

    // console.log(param);
    const rules = {};
    this.verifyStore.items.forEach(item => {
      const name = item.name;
      // const rules = item.rules;
      rules[ name ] = item.rules;
    });

    const validation = new Validator(param, rules);
    if (validation.passes()) {
      console.info('验证通过');
      this.props.onSubmit && this.props.onSubmit(param);
    }
    else {
      let errors = validation.errors.all();
      let firstFlag = true;
      for (let key in errors) {
        // Message.warn(errors[key][0])
        // 光标focus
        /*if (firstFlag) {
          firstFlag = false;
          form[ key ].focus();
        }*/

        this.verifyStore.updateError(key, errors[key][0]);
      }
      console.warn('验证不通过');
    }
  }
} 

export default Form;