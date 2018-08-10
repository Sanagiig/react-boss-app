import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, TabBar } from "antd-mobile";
import NavLinkBar from "../components/navLinkBar";
import Boss from "../components/boss";
import Genius from "../components/genius";
import Message from "../components/message";
import User from "../components/user";

@connect(state => state)
export default class Dashboard extends Component {
  render() {
    const navList = [
      {
        path: "/boss",
        text: "人才",
        icon: "boss",
        title: "人才列表",
        component: Boss,
        hide: false
      },
      {
        path: "/genius",
        text: "老板",
        icon: "boss",
        title: "老板列表",
        component: Genius,
        hide: false
      },
      {
        path: "/message",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Message,
        hide: false
      },
      {
        path: "/user",
        text: "用户",
        icon: "user",
        title: "用户信息",
        component: User,
        hide: false
      }
    ];
    return (
      <div>
        <NavBar mode="dark">主页</NavBar>
        <h1>dashboard</h1>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}
