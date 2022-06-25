import axiosClient from "./baseAPI";

const otherAPI = {
  getAllRoom: () => {
    const url = "/room/get-all-room";

    return axiosClient.get(url);
  },
};

export default otherAPI;
