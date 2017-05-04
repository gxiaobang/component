/**
 * 详情
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Table } from 'components';
import { getFormParam } from 'utils';
import http from 'utils/http';
import _ from 'lodash';
import './style';

const { FormItem } = Form;


class InfoFooter extends React.Component {
  render() {
    return (
      <div className="info-footer">
        {this.props.children}
      </div>
    );
  }
}

class Info extends React.Component {

  static InfoFooter = InfoFooter;

  state = {
    param: null
  };

  componentDidMount() {
    if (this.props.http) {
      this.request();
    }
  }

  // 列表请求
  request(param = null) {
    this.setState({ loading: true });
    http({
      ...this.props.http,
      param: {
        ...this.props.param,
      },
      onSuccess: (data) => {
        console.log(data)
        this.setState({
          param: data.data
        });
      }
    });
  }

  render() {
    let Page = this.props.children;

    return (
      <div className="info" ref="info">
        {
          this.state.param &&
            <div>
              <Page param={this.state.param}></Page>
            </div>
        }
      </div>
    );
  }
}

export default Info;