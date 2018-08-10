import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Toast } from "antd-mobile";
import { normalGet, normalPost } from "../methods/ajax";
import { getCookie, localSave } from "../methods/util";
import { userStateToProps, userDisToProps } from "../store/user/user";

@withRouter
@connect(
  userStateToProps,
  userDisToProps
)
export default class AuthRouter extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    const publicList = ["/login", "/register"];
    const pathname = this.props.location.pathname;
    console.warn("mount");
    const params = { userId: getCookie("userId") };

    //获取用户，成功回调
    const getInfoSuc = data => {
      if (data) {
        let msg = "你好，" + data.username;
        this.props.set({ isAuth: true, userInfo: data });
        //判断是否需要完善信息
        if (!data.avatar || !data.desc) {
          Toast.info((msg += ",请完善你的个人信息"));
          this.props.history(`${data.role}/info`);
        } else {
          Toast.info(msg);
          this.props.history("/main");
        }
      } else {
        this.props.history.push("/login");
      }
    };

    if (publicList.indexOf(pathname) !== -1) {
      return null;
    }

    //获取用户信息
    normalGet("/user/info", params, getInfoSuc);

    //是否登录
    //现在的url 地址 是否需要跳转
    //用户的type
    // 用户是否完善信息
  };

  render() {
    return <div />;
  }
}
