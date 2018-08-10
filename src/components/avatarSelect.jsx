import React, { Component } from "react";
import { Grid, List } from "antd-mobile";
import propTypes from "prop-types";

export default class AvatarSelect extends Component {
  static propTypes = { setAvatar: propTypes.func.isRequired };
  constructor() {
    super();
    this.state = {};
  }

  selectAvatar = icon => {
    this.state.avatar = icon;
  };

  render() {
    const avatarList = "boy,girl,bull,chick".split(",").map(v => {
      return {
        icon: require(`../static/avatar/${v}.png`),
        text: v
      };
    });
    const gridHeader = this.state.icon ? (
      <div>
        <span>已选择头像 </span>
        <img src={this.state.icon} alt="头像" />
      </div>
    ) : (
      "请选择头像"
    );
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            onClick={el => {
              this.props.setAvatar(el.text);
              this.setState(el);
            }}
          />
        </List>
      </div>
    );
  }
}
