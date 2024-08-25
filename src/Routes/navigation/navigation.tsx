import { useTheme } from "@emotion/react";
import { Outlet } from "react-router-dom";
import useAxiosInterceptor from "../../Hooks/useAxiosInterceptor";
import { useMemo } from "react";
import { API_INSTANCE } from "../../Services/baseService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../State/store";
import { setAuthentication } from "../../State/authSlice/authSlice";
import Drawer from "../../Components/drawer/drawer";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function Navigation() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector<RootState>((state) => state.auth.authanticated);
  useAxiosInterceptor();
  console.log("auth", auth);
  useMemo(() => {
    const inner = async () => {
      await API_INSTANCE.get(apiUrl + "api/UserContoller/IsLoggedIn")
        .then((res) => {
          dispatch(
            setAuthentication({
              authanticated: true,
            })
          );
        })
        .catch((err) => {
          dispatch(setAuthentication({ authanticated: false }));
        });
    };
    inner();
  }, []);
  return (
    <div>
      {auth ? <Drawer /> : null}
      <Outlet />
    </div>
  );
}
