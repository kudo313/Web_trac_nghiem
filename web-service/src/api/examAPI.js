import axiosClient from "./baseAPI";

const examAPI = {
  getExam: (params) => {
    const url = "/get_exam";
    return axiosClient.get(url, { params });
  },

  getListExamForRoom: (params) => {
    const url = "/get_exams_for_room";
    return axiosClient.get(url, { params });
  },

  addExamByAdmin: (data) => {
    const url = "/admin/add_exam";
    return axiosClient.post(url, data);
  },

  getExamHistory: (params) => {
    const url = "/get_exam_history";
    return axiosClient.get(url, { params });
  },

  postSaveExam: (data) => {
    const url = "/save_result";
    return axiosClient.post(url, data);
  },

  deleteExamById: (params) => {
    const url = "/admin/delete_exam";
    return axiosClient.delete(url, { params });
  },

};

export default examAPI;
