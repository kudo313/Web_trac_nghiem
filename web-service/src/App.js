// or for Moment.js
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import DefaultLayout from "layouts/DefaultLayout";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./assets/scss/index.scss";
import "antd/dist/antd.min.css";
import { Suspense } from "react";

export const UserContext = createContext();

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DefaultLayout />
        </LocalizationProvider>
      </Suspense>
    </ThemeProvider>
  );
}
