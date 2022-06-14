import axiosInstance from "axios";

const axiosClient = axiosInstance.create({
  baseURL: "http://localhost:8001",
  // headers: {
  //     'content-type': 'application/json',
  //     'accept': 'application/json',
  //     timeout: 30000,
  // },
  // paramsSerializer: params => queryString.stringifyUrl(params),
});

axiosClient.interceptors.request.use(function (config) {
  //add handle token
  let headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("accessToken")) {
    headers = {
      ...headers,
      token: localStorage.getItem("accessToken"),
    };
  }

  config.headers = headers;
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    // if (response && response.data) {
    //     return response.data;
    // }
    // const apiCallIndex = apiCallStack.indexOf(response.config?.url);
    // if (apiCallIndex !== -1) {
    //   // showLoading(false)
    //   apiCallStack.splice(apiCallIndex, 1);
    // }

    return response;
  },
  function (err) {
    // const apiCallIndex = apiCallStack.indexOf(error.config?.url);
    // if (apiCallIndex !== -1) {
    //   //showLoading(false)
    //   apiCallStack.splice(apiCallIndex, 1);
    // }
    // return Promise.reject(error);
  }
);

export default axiosClient;
