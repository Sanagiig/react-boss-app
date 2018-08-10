import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  List,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Radio,
  Toast
} from "antd-mobile";

import { userStateToProps, userDisToProps } from "../store/user/user";
import Logo from "../components/logo";

@connect(
  userStateToProps,
  userDisToProps
)
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount = () => {
    if (this.props.userInfo) {
      this.loginSuc(this.props.userInfo);
    }
  };

  loginSuc = userInfo => {
    if (userInfo.avatar && userInfo.desc) {
      this.props.history.push("/main");
    } else {
      this.props.history.push(`${userInfo.role}/info`);
    }
  };

  register = () => {
    this.props.history.push("/register");
  };

  login = () => {
    const u = this.state.username;
    const p = this.state.password;
    const suc = userInfo => this.loginSuc(userInfo);
    this.props.login(u, p, suc);
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <div>
        <Logo />
        <h1 style={{ textAlign: "center" }}>登录页面</h1>
        <WingBlank>
          <List>
            <List.Item>
              <InputItem onChange={v => this.handleChange("username", v)}>
                用户名
              </InputItem>
            </List.Item>
            <List.Item>
              <InputItem
                type="password"
                onChange={v => this.handleChange("password", v)}
              >
                密码
              </InputItem>
            </List.Item>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.login()}>
            登 录
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.register()}>
            注 册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
