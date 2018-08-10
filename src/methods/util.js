export const getStatesByScope = (state, scopeName) => {
  if (state[scopeName] === undefined) {
    return state;
  } else if (typeof state[scopeName] === "object") {
    return state[scopeName];
  }
};

export const getDirectUrl = ({ role, avatar }) => {
  let url = "/" + role;
  if (!avatar) {
    url += "/info";
  }

  return url;
};

export const localSave = (key, value) => {
  if (arguments.length == 1) {
    return JSON.parse(localStorage.getItem(key));
  } else if (arguments.length == 2) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getCookie = Name => {
  var search = Name + "="; //查询检索的值
  var returnvalue = ""; //返回值

  if (document.cookie.length > 0) {
    let sd = document.cookie.indexOf(search);
    let end = "";
    if (sd != -1) {
      sd += search.length;
      end = document.cookie.indexOf(";", sd);
      if (end == -1) end = document.cookie.length;
      //unescape() 函数可对通过 escape() 编码的字符串进行解码。
      returnvalue = unescape(document.cookie.substring(sd, end));
    }
  }
  return returnvalue;
};

export const setCookie = (name, value, hours) => {
  //获取当前时间
  var date = new Date();
  var now = date.getTime();
  hours = hours || 24;
  //将date设置为hours 小时 以后的时间
  date.setTime(now + hours * 3600 * 1000);
  document.cookie = `${name}=${escape(value)};expires=${date.toGMTString()}`;
};

export const removeCookie = name => {
  //获取当前时间
  var date = new Date();
  //将date设置为过去的时间
  date.setTime(date.getTime() - 10000);
  //将cookie删除
  document.cookie = `${name}=''; expires=${date.toGMTString()}`;
};
