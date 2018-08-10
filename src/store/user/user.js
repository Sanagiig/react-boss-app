import axios from "axios";
import { Toast } from "antd-mobile";
import { normalGet, normalPost } from "../../methods/ajax";
import { getCookie } from "../../methods/util";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SETINFO = "SETINFO";
const SET = "SET";

export const userScopeName = "user";

export const userReducer = (state = { isAuth: false }, action = {}) => {
  switch (action.type) {
    case SET:
      return { ...state, ...action.payload };
    case LOGIN:
      return { ...state, isAuth: true };
    case SETINFO:
      return { ...state, userInfo: action.payload };
    case LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

function runFn(fn, arg) {
  if (typeof fn === "function") fn(arg);
}

function setAct(payload) {
  return { type: SET, payload: payload };
}

function loginAct() {
  return { type: LOGIN };
}

function logoutAct() {
  return { type: LOGOUT };
}

function setInfoAct(info) {
  info = info instanceof Object ? info : {};
  return { type: SETINFO, payload: info };
}

/**
 * dispatch
 */
//set
export const setDis = dispatch => payload => {
  dispatch(setAct(payload));
};

//register
export const registerDis = dispatch => (
  { username, password, repassword, role },
  suc
) => {
  let params = {
    username,
    password,
    role
  };

  let success = data => {
    if (data) {
      Toast.info("注册成功");
      runFn(suc, data);
    }
  };

  if (!username || !password || !repassword) {
    return Toast.fail("用户名密码必须输入");
  }
  if (password !== repassword) {
    return Toast.fail("两次输入的密码不一致");
  }

  normalPost("/user/register", params, success);
};

export const loginDis = dispatch => (username, password, suc) => {
  const params = {
    username,
    password
  };

  //成功的回调
  const success = data => {
    if (data) {
      dispatch(loginAct());
      dispatch(setInfoAct(data));
      runFn(suc, data);
    }
  };

  const error = err => {
    Toast.fail("登录失败");
    console.warn(err);
  };

  normalPost("/user/login", params, success, error);
};

export const logoutDis = dispatch => () => {
  dispatch(logoutAct());
  dispatch(setInfoAct(""));
};

export const updateDis = dispatch => (userInfo, cb) => {
  let suc = userInfo => {
    dispatch(setInfoAct(userInfo));
    runFn(cb, userInfo);
    Toast.info("信息成功提交");
  };

  for (let k in userInfo) {
    if (!userInfo[k]) {
      Toast.fail("请填写所有信息");
      return;
    }
  }

  userInfo.userId = getCookie("userId");
  normalPost("/user/update", userInfo, suc);
};

export const userStateToProps = state => {
  return state[userScopeName] || {};
};

export const userDisToProps = (dispatch, props) => {
  return {
    login: loginDis(dispatch),
    logout: logoutDis(dispatch),
    set: setDis(dispatch),
    update: updateDis(dispatch),
    register: registerDis(dispatch),
    ...props
  };
};
