/**
 * 单选框
 * @example
 *   <Radio name="opt">选项一</Radio>
 *   <Radio name="opt">选项二</Radio>
 */

import React from 'react';
import _ from 'lodash';
import http from '@/utils/http';
import './style';

class RadioGroup extends React.Component {

  state = {
    options: this.props.options || []
  };

  componentDidMount() {
    if (this.props.http) {
      this.request();
    }
  }

  request() {
    const { keys = ['value', 'label'] } = this.props;

    http({
      ...this.props.http,
      onSuccess: (data) => {
        if (_.isArray(data.data.list)) {
          let options = [];
          data.data.list.forEach(item => {
            options.push({
              value: item[ keys[0] ],
              label: item[ keys[1] ]
            });
          });

          this.setState({ options });
        }
      }
    });
  }

  render() {
    const { name, deafultValue = [] } = this.props;
    const { options } = this.state;

    return (
      <div className="radio-group">
        {
          options.map((item, key) => {
            return <Radio key={key} name={name} value={item.value} defaultChecked={
              deafultValue.indexOf(item.value) > -1
            }>{item.label}</Radio>
          })
        }
      </div>
    );
  }
}

class Radio extends React.Component {

  static RadioGroup = RadioGroup;

  handleChange = this.props.onChange;

  render() {
    // const { name, checked, value } = this.props;
    const props = {...this.props};
    delete props.children;
    return (
      <label className="radio">
        <input {...props} type="radio" onChange={this.handleChange} />
        {this.props.children}
      </label>
    );
  }
}
export default Radio;