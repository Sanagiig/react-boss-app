import React, { Component } from "react";
import logoImg from "../static/image/job.png";
import "../static/style/logo.css";
export default class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt="Logo" srcset="" />
      </div>
    );
  }
}
