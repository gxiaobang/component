/**
 * 校验
 */

import React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import Validator from 'validatorjs';
import { Animate } from '@/components';
import './style';

Validator.useLang('zh');

@observer
class Validate extends React.Component {
  // 检验器
  static Validator = Validator;

  static contextTypes = {
    label: React.PropTypes.string,
    verifyStore: React.PropTypes.object
  };

  // props更新
  componentWillReceiveProps(nextProps) {
    /*if (this.props.value !== nextProps.value) {
      this.verify(nextProps);
    }*/
  }

  componentWillMount() {
    this.initVerify();
  }

  componentDidMount() {
    this.update({
      rules: this.props.rules,
      name: this.props.name
    });
  }

  // 初始化验证
  initVerify() {
    this.verifyStoreItem = this.context.verifyStore.addItem({
      label: this.context.label
    });
  }

  // 更新验证
  update(options) {
    if (this.verifyStoreItem) {
      // console.log(this.verifyStoreItem)
      Object.assign(this.verifyStoreItem, options);
    }
  }

  // 校验
  verify(value) {
    const { rules } = this.verifyStoreItem;
    const { label } = this.context;

    var validation = new Validator({ [label]: value }, { [label]: rules });

    let error = null;
    if (validation.fails()) {
      error = validation.errors.first(label);
    }
    
    this.verifyStoreItem.error = error;
    // this.setState({ error });
  }

  render() {
    // console.log(this.context);
    // const { error } = this.state;

    const { error } = this.verifyStoreItem;
    const cls = classnames('validate', error && 'error');
    return (
      <div className={cls}>
        {this.props.children}
        {
          error && 
            <div className="validate-error">
              <Animate name="wobble">
                <label className="validate-error-label">{error}</label>
              </Animate>
            </div>
        }
      </div>
    );
  }
}

export default Validate;