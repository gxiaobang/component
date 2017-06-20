/**
 * 数字输入框
 */

import React from 'react';
import { Input } from '@/components';


class InputNumber extends React.Component {
  render() {
    return (
      <Input {...this.props} type="number" />
    );
  }
}

export default InputNumber;