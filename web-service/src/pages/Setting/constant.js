import PersonalInfo from "./PersonalInfo";
import ManageExams from "./ManageExams";

export const MENUBAR_ADMIN = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
  },

  {
    name: "Quản lý bài thi",
    component: <ManageExams />,
  },

  // {
  //   name: "Các trang quản lý khác của admin",
  //   component: null,
  // },
];

export const MENUBAR_MEMBER = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
  },

  // {
  //   name: "Các trang quản lý khác của admin",
  //   component: null,
  // },
];

export const MENUBAR_SUPER_ADMIN = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
  },
  {
    name: "Quản lý bài thi",
    component: <ManageExams />,
  },
  // {
  //   name: "Các trang quản lý khác của admin",
  //   component: null,
  // },
];
