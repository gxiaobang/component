/**
 * 校验
 */

import React from 'react';
import classnames from 'classnames';
import Validator from 'validatorjs';
import './style';

Validator.useLang('zh');

class Validate extends React.Component {
  // 检验器
  static Validator = Validator;

  state = {
    errorMsg: ''
  };

  // props更新
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.verify(nextProps);
    }
  }
  // 校验
  verify(props) {
    const { rules, value } = props;

    var validation = new Validator({ '': value }, { '': rules });

    let errorMsg = null;
    if (validation.fails()) {
      errorMsg = validation.errors.first('');
    }
    
    this.setState({
      errorMsg
    });
  }

  render() {
    const { errorMsg } = this.state;
    const cls = classnames('rc-smart-validate', errorMsg && 'error');
    
    return (
      <div className={cls}>
        {this.props.children}
        {
          errorMsg && 
            <div className="rc-smart-validate-error">
              <div style={{ display: 'inline-block' }} className="animated wobble">{errorMsg}</div>
            </div>
        }
      </div>
    );
  }
}

export default Validate;