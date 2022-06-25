import axiosClient from "./baseAPI";

const infoAPI = {
  getInfo: () => {
    const url = "/get_user";
    const params = {
      email: localStorage.getItem("email"),
    };
    return axiosClient.get(url, { params });
  },

  putUpdateUser: (data) => {
    const url = "/update_user";

    return axiosClient.put(url, data);
  },
};

export default infoAPI;
