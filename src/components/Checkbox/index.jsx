/**
 * 多选框
 */

import React from 'react';
import http from 'utils/http';
import _ from 'lodash';
import './style';

class CheckboxGroup extends React.Component {

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
    const { name, defaultValue = [], disabled } = this.props;
    const { options } = this.state;

    return (
      <div className="checkbox-group">
        {
          options.map((item, key) => {
            return <Checkbox key={key} name={name} value={item.value} defaultChecked={
              defaultValue.indexOf(item.value) > -1
            } disabled={disabled}>{item.label}</Checkbox>
          })
        }
      </div>
    );
  }
}

class Checkbox extends React.Component {

  static CheckboxGroup = CheckboxGroup;

  handleChange = this.props.onChange;

  render() {
    // const { name, checked, value } = this.props;
    const props = {...this.props};
    delete props.children;
    return (
      <label className="checkbox">
        <input {...props} type="checkbox" onChange={this.handleChange} />
        {this.props.children}
      </label>
    );
  }
}

export default Checkbox;