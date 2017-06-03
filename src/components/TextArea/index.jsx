/**
 * 多行文本框
 * @example
 * <TextArea name="txt" defaultValue="123" />
 */

import React from 'react';
import './style';

class TextArea extends React.Component {
  render() {
    const { children, defaultValue, readOnly, name } = this.props;
    return (
      <textarea name={name} className="textarea" defaultValue={defaultValue || children} readOnly={readOnly}></textarea>
    );
  }
}

export default TextArea;