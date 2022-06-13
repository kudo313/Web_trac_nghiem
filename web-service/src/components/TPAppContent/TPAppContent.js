import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import checkLogin from "utils/checkLogin";
import SignIn from "../../pages/SignIn";
import router from "../../routes";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  return checkLogin() ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' state={{ from: location }} />
  );
};

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          {router.map((route, idx) => {
            return (
              route.component && (
                <Route key={idx} path={route.path} element={route.component} />
              )
            );
          })}
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </>
  );
};

export default AppContent;
