/**
 * 登录
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Form, Select, Message } from 'components';
import { getFormParam, http } from 'utils';
import router from 'utils/router';
import './style';

const { FormItem } = Form;
 
class Login extends React.Component {

  componentDidMount() {
    // router.setURL('/login');
  }

  handleClick() {
    const form = ReactDOM.findDOMNode(this.refs.form);
    const param = getFormParam(form);
    console.log(param);
  }

  render() {
    return (
      <div className="login">
        <Form ref="form" onSubmit={
          (param) => {
            // console.log(param)

            http({
              baseURL: '/mock',
              // url: '/login'
              url: '/login',
              data: param,
            }).then((response) => {
              // console.log(response);
              const { data } = response;

              // Message.success(data.message);
              window.location = '/';
            });
          }
        }>
          <FormItem label="用户名">
            <Input type="text" name="user" placeholder="请输入用户名" rules="required|min:2|max:20" />
          </FormItem>

          <FormItem label="密码">
            <Input type="password" name="pwd" placeholder="请输入密码" rules="required|numeric" />
          </FormItem>

          <FormItem className="text-center">
            <Button type="primary" submit>登录</Button>
          </FormItem>

          {/*<FormItem>
            <Button onClick={this.handleClick.bind(this)}>获取表单数据</Button>
          </FormItem>*/}
        </Form>        
      </div>
    );
  }
}

export default Login;