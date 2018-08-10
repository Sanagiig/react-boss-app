import axios from "axios";
import { Toast } from "antd-mobile";

axios.interceptors.request.use(function(config) {
  console.log("loading");
  Toast.loading("加载中...", 0);
  return config;
});

axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
});

export const disposeJsonHeader = json => {
  if (json.code == 0) {
    return json.data || true;
  } else if (json.code == 1) {
    Toast.fail(json.msg);
    return null;
  }
};

export const normalGet = (url, params, suc, err, always) => {
  params = params || {};
  suc = suc || function() {};
  err = err || function() {};
  always = always || function() {};

  axios
    .get(url, { params })
    .then(res => {
      let data = disposeJsonHeader(res.data);
      try {
        suc(data);
        always(data);
      } catch (err) {
        console.warn("callback error ", err);
      }
    })
    .catch(e => {
      Toast.fail("请求失败");
      console.warn("请求失败", e);
      err(e);
      always(e);
    });
};

export const normalPost = (url, params, suc, err, always) => {
  params = params || {};
  suc = suc || function() {};
  err = err || function() {};
  always = always || function() {};

  axios
    .post(url, params)
    .then(res => {
      let data = disposeJsonHeader(res.data);
      try {
        suc(data);
        always(data);
      } catch (err) {
        console.warn("callback error ", err);
      }
    })
    .catch(e => {
      Toast.fail("请求失败");
      console.warn("请求失败", e);
      err(e);
      always(e);
    });
};
