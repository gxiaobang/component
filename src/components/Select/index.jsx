/**
 * 下拉选择框
 * @example
 *   <Select name="opt" mode="combobox">
 *     <Option>请选择</Option>
 *     <Option>选项一</Option>
 *   </Select>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'components';
import classnames from 'classnames';
import Validate from 'components/Validate';
import http from 'utils/http';
import './style';

class Option extends React.Component {
  render() {
    const { value, children } = this.props;
    return <option value={value}>{children}</option>
  }
}

class Select extends React.Component {

  static Option = Option;

  state = {
    options: this.props.options || [],
    // 搜索项
    searchOptions: [],
    // 值
    activeNum: 0
  };

  componentDidMount() {
    if (this.props.http) {
      this.request(this.props.http);
    }
  }

  // props更新
  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      // this.verify(nextProps);
      this.setState({
        options: nextProps.options
      });
    }
  }

  // 获取元素
  getElement() {
    return this.refs.select;
  }

  // 获取值
  getVal() {
    let select = this.getElement();
    return select.value;
  }

  // change 事件
  handleChange(e) {
    let value = e.target.value;
    // 校验规则
    this.refs.validate && this.refs.validate.verify(value);
    this.props.onChange && this.props.onChange(e);
  }

  // 搜索
  handleSearch(e) {
    const { options } = this.state;
    let val = e.target.value.trim();
    let searchOptions = [];
    options.forEach((item) => {
      if (item.label.indexOf(val) > -1) {
        searchOptions.push(item);
      }
    });

    if (val == '') {
      this.refs.hiddenInput.value = '';
    }

    this.setState({ 
      searchOptions, 
      activeNum: -1
    });
  }

  // 选中
  handleSelect(item) {
    // console.log(item);
    let input = this.refs.input.getElement();
    // this.refs.input.refs.validate.verify(item.label);
    input.value = item.label;

    this.refs.hiddenInput.value = item.value;

    /*this.setState({
      searchOptions: []
    });*/
  }

  // 键盘事件
  handleKeyDown(e) {
    // console.log(e.keyCode);

    // 阻止默认事件
    switch (e.keyCode) {
      case 13:
      case 38:
      case 40:
        e.preventDefault();
        break;
    }

    let { activeNum, searchOptions } = this.state;
    switch (e.keyCode) {
      // 上
      case 38:
        activeNum--;
        
        if (activeNum < 0) {
          activeNum = searchOptions.length - 1;
        }

        this.setState({ activeNum });
        break;

      // 下
      case 40:
        activeNum++;
        
        if (activeNum > searchOptions.length - 1) {
          activeNum = 0;
        }

        this.setState({ activeNum });
        break;
      
      case 13:
        // console.log(activeNum);

        if (activeNum > -1) {
          this.handleSelect(searchOptions[activeNum]);
          this.close();
        }
        break;
    }
  }

  // 离开
  handleOut() {
    setTimeout(() => {
      this.close();
    }, 100)
  }

  request(options) {
    this.http = http({
      ...options,
      onSuccess: (data) => {
        this.setState({
          options: data.data
        });

        if (this.props.defaultValue) {
          this.refs.select.value = this.props.defaultValue;
        }
      }
    });
  }

  close() {
    this.setState({
      searchOptions: []
    });
  }

  // 渲染元素
  renderElement(props, cls, keys) {
    return (
      <select ref="select" {...props} className={cls} onChange={this.handleChange.bind(this)} onMouseDown={
        (e) => {
          if (this.props.readOnly) {
            e.preventDefault();
          }
        }
      }>
        {this.props.children}
        {
          this.state.options.map((item, index) => {
            let value = item[ keys[0] ];
            let label = item[ keys[1] ];
            return <option key={index} value={value}>{label}</option>;
          })
        }
      </select>
    );
  }

  // 默认下拉框
  renderDefault(rules, cls, keys, props) {
    if (rules) {
      return (
        <Validate ref="validate" rules={rules} name={this.props.name}>
          {this.renderElement(props, cls, keys)}
        </Validate>
      );
    }
    else {
      return this.renderElement(props, cls, keys);
    }
  }

  // 搜索下拉框
  renderCombobox(rules, cls, keys, props) {
    const { options, searchOptions } = this.state;

    return (
      <div className="select-wrapper">
        <Input 
          ref="input"
          onChange={(e) => this.handleSearch(e)}
          onKeyDown={(e) => this.handleKeyDown(e)} 
          onBlur={() => this.handleOut()} />
        {
          searchOptions.length > 0 && 
            <ul className="select-options">
              {
                searchOptions.map((item, index) => {
                  return <li key={index} className={classnames(index == this.state.activeNum && 'active')} onClick={
                    () => {
                      this.handleSelect(item);
                    }
                  }>{item.label}</li>
                })
              }
            </ul>
        }
        <input ref="hiddenInput" type="hidden" name={props.name} defaultValue={props.defaultValue} />
      </div>
    );
  }

  // 多选
  renderTags() {

  }

  render() {
    const { className, keys = ['value', 'label'], http, rules, options, mode = 'default', ...props } = this.props;
    // const { options } = this.state;

    let cls = classnames('select', className);

    switch (mode) {
      case 'default':
        return this.renderDefault(rules, cls, keys, props);

      // 搜索下拉框
      case 'combobox':
        return this.renderCombobox(rules, cls, keys, props);

      // 多选
      case 'tags':
        return this.renderTags();
    }
  }
}

export default Select;