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
import { Input, Button } from 'components';
import classnames from 'classnames';
import Validate from 'components/Validate';
import http from 'utils/http';
import { evt, dom } from 'utils';
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

    // 选中多选
    selectedOptions: this.props.defaultValue || [],

    // 值
    activeNum: 0,
    // 打开
    isOpen: false
  };

  componentDidMount() {
    if (this.props.http) {
      this.request(this.props.http);
    }
  }

  componentWillUnmount() {
    this.close();
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

  // 选中多选
  handleSelectTags(value, item) {
    const { selectedOptions } = this.state;
    let index = selectedOptions.indexOf(value);

    if (index > -1) {
      selectedOptions.splice(index, 1);
    }
    else {
      selectedOptions.push(value);
    }

    this.setState({ selectedOptions });
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

  // 打开
  handleOpen() {
    this.setState({
      isOpen: true
    });

    this.hide && this.hide();
    this.hide = evt.add(document, 'click', (e) => {
      if (!dom.contains(this.refs.self, e.target)) {
        this.close()
      }
    });
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
    this.hide && this.hide();
    this.setState({
      searchOptions: [],
      isOpen: false
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
  renderTags(rules, cls, keys, props) {

    const { options, selectedOptions, isOpen } = this.state;

    return (
      <div className="select-wrapper" ref="self">
        <Button onClick={
          () => this.handleOpen()
        }>
          已选 {selectedOptions.length} 项
          <span className="caret"></span>
        </Button>
        {
          isOpen && 
            <ul className="select-options">
              {
                options.map((item, index) => {
                  return <li key={index} className={selectedOptions.indexOf(item[ keys[0] ]) > -1 && 'active'} onClick={
                    () => {
                      this.handleSelectTags(item[ keys[0] ], item);
                    }
                  }>{item[ keys[1] ]}</li>
                })
              }
            </ul>
        }
        {
          selectedOptions.map((value) => {
            return <input type="hidden" name={props.name} value={value} />
          })
        }
      </div>
    );
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
        return this.renderTags(rules, cls, keys, props);
    }
  }
}

/*import testComponent from 'utils/testComponent';
testComponent(
  <Select mode="tags" name="tags[]" options={[{ value: 123, label: '123' }, { value: 1234, label: '1234'}, { value: 12345, label: '12345' }]} defaultValue={[123, 12345]}></Select>
);*/

export default Select;