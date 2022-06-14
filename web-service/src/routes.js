import CurCourses from "pages/CurCourses";
import Error404 from "pages/Error/Error404";
import Exam from "pages/Exam";
import ForgotPassword from "pages/ForgotPassword";
import ListExams from "pages/ListExams/ListExams";
import React, { lazy } from "react";
import { default as AllCourses } from "./pages/AllCourses";
import Setting from 'pages/Setting';
import DetailExam from "pages/DetailExam";
import SignIn from "pages/SignIn";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "*",
    component: <Error404 />,
  },
  {
    path: "/",
    component: <Navigate to='/list-exams' />,
  },
  {
    path: "current-courses",
    component: <CurCourses />,
  },
  {
    path: "all-courses",
    component: <AllCourses />,
  },
  {
    path: "list-exams",
    component: <ListExams />,
  },

  {
    path: "setting",
    component: <Setting />,
  },
  {
    path: "exam",
    component: <Exam />,
  },
  {
    path: "forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "detail-exam",
    component: <DetailExam />,
  },

];

export default routes;
