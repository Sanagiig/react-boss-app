import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Test from "./pages/test";
import Main from "./pages/main";
import AuthRouter from "./components/authRouter";
import { userStateToProps } from "./store/user/user";
import { localSave } from "./methods/util";
import GeniusInfo from "./pages/geniusInfo";
import BossInfo from "./pages/bossInfo";
import Dashboard from "./pages/dashboard";

@connect(userStateToProps)
class App extends Component {
  componentDidMount() {
    console.log("context", this.context);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update'", this.props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <AuthRouter />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/genius/info" exact component={GeniusInfo} />
            <Route path="/boss/info" exact component={BossInfo} />
            <Route path="/test" exact component={Test} />
            <Route path="/main" exact component={Main} />
            <Route component={Dashboard} />
            {!this.props.userInfo && <Redirect to="/login" />}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
