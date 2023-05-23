import { JSXElementConstructor, Key, ReactElement, useEffect, useState } from "react";
import "assets/styles/common.scss";
import { useAppDispatch, useAppSelector } from "store/store";
import { notificationClear } from "store/slices/notificationSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import routes from "routes";
import SignIn from "compoenents/authenticate/SignIn";
import SignUp from "compoenents/authenticate/SignUp";
import { Box, CircularProgress, Snackbar } from "@mui/material";

const mdTheme = createTheme();

export default function App() {
  const appDispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReducer);
  const notificationInfo = useAppSelector((state) => state.notificationReducer);
  const [loader, setLoader] = useState(false);
  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
        alias: string;
      }) => {
        if (route.collapse && route.collapse.length) {
          return getRoutes(route.collapse);
        }

        const { component } = route;

        if (route.route) {
          return <Route path={route.route} element={component} key={route.key} />;
        }

        return null;
      }
    );
  const openNotification = () => {
    if (notificationInfo.message) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setLoader(authState.loading && true);
  }, [authState.loading]);

  const clearNotification = () => {
    appDispatch(notificationClear());
  };
  return (
    <ThemeProvider theme={mdTheme}>
      {loader && (
        <Box
          style={{
            background: "rgba(0,0,0,0.3)",
            zIndex: 99999,
            display: "flex",
            position: "fixed",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress size={100} style={{ color: "#fff" }} />
        </Box>
      )}
      {notificationInfo?.message && (
        <Snackbar
          color={notificationInfo.status ? "success" : "error"}
          title={notificationInfo.status ? "Success" : "Error"}
          message={notificationInfo.message}
          open={openNotification()}
          onClose={clearNotification}
        />
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}
