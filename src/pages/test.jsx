import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

export default class Test extends Component {
  componentDidMount = () => {
    axios
      .get("/user/allInfo")
      .then(res => {
        console.log("all info", res.data);
      })
      .catch(err => {
        console.warn("test err", err);
      });
  };

  render() {
    return <div />;
  }
}
