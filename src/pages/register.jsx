import React, { Component } from "react";
import { connect } from "react-redux";
import {
  List,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Radio
} from "antd-mobile";

import { userDisToProps } from "../store/user/user";
import Logo from "../components/logo";

const RadioItem = Radio.RadioItem;

@connect(
  null,
  userDisToProps
)
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      repassword: "",
      role: "genius"
    };
  }

  checkRole = value => {
    this.setState({ role: value });
  };

  handleChange = (k, v) => {
    this.setState({ [k]: v });
  };

  handleRegister = () => {
    const suc = () => this.props.history.push("/login");
    this.props.register(this.state, suc);
  };

  render() {
    const roleList = [
      { value: "genius", label: "牛人" },
      { value: "boss", label: "Boss" }
    ];
    return (
      <div>
        <Logo />
        <h1 style={{ textAlign: "center" }}>注册页</h1>
        <WingBlank>
          <List>
            <List.Item>
              <InputItem
                onChange={v => {
                  this.handleChange("username", v);
                }}
              >
                用户名
              </InputItem>
            </List.Item>

            <List.Item>
              <InputItem
                type="password"
                onChange={v => {
                  this.handleChange("password", v);
                }}
              >
                密码
              </InputItem>
            </List.Item>

            <List.Item>
              <InputItem
                type="password"
                onChange={v => {
                  this.handleChange("repassword", v);
                }}
              >
                确认密码
              </InputItem>
            </List.Item>
          </List>
          <WhiteSpace />
          {roleList.map(role => (
            <RadioItem
              key={role.value}
              checked={this.state.role === role.value}
              onClick={() => this.checkRole(role.value)}
            >
              {role.label}
            </RadioItem>
          ))}
          <WhiteSpace />
          <Button type="primary" onClick={() => this.handleRegister()}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
export default Register;
