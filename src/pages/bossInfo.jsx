import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavBar,
  List,
  InputItem,
  TextareaItem,
  Button,
  Icon,
  WingBlank,
  WhiteSpace
} from "antd-mobile";
import { userDisToProps } from "../store/user/user";
import AvatarSelect from "../components/avatarSelect";

@connect(
  null,
  userDisToProps
)
export default class BossInfo extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      desc: "",
      company: "",
      money: ""
    };
  }

  setAvatar = a => {
    this.setState({ avatar: a });
  };

  handleStateChange = (k, v) => {
    this.setState({ [k]: v });
  };

  handleSubmit = () => {
    this.props.update(this.state);
  };

  render() {
    return (
      <div>
        <NavBar mode="dark">Boss信息完善</NavBar>

        <List>
          <List.Item>
            <AvatarSelect setAvatar={this.setAvatar} />
          </List.Item>
          <List.Item>
            <TextareaItem
              title="个人信息"
              rows={3}
              autoHeight
              onChange={v => this.handleStateChange("desc", v)}
            />
          </List.Item>
          <List.Item>
            <TextareaItem
              title="招聘信息"
              rows={3}
              autoHeight
              onChange={v => this.handleStateChange("title", v)}
            />
          </List.Item>
          <List.Item>
            <InputItem onChange={v => this.handleStateChange("money", v)}>
              薪资待遇
            </InputItem>
          </List.Item>
          <List.Item>
            <InputItem onChange={v => this.handleStateChange("company", v)}>
              公司
            </InputItem>
          </List.Item>
          <List.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
          </List.Item>
        </List>
      </div>
    );
  }
}
