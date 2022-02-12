const axios = require("axios");

const getData = (url, endpoint, auth) => {
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    url: url + endpoint,
    auth: auth,
  });
};

const postData = (url, endpoint, auth, payload) => {
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    url: url + endpoint,
    auth: auth,
    data: { payload },
  });
};

module.exports = { getData, postData };
