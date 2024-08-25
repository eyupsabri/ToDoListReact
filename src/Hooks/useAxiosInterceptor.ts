import { useEffect, useMemo } from "react";
import { API_INSTANCE } from "../Services/baseService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../State/store";
import { setAuthentication } from "../State/authSlice/authSlice";
import { parseISO } from "date-fns";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === "object") handleDates(value);
  }
}

const useAxiosInterceptor = () => {
  const dispatch = useDispatch<AppDispatch>();
  useMemo(() => {
    API_INSTANCE.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        // console.log("request interceptor" + config.url);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    API_INSTANCE.interceptors.response.use(
      (response) => {
        handleDates(response.data);
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          if (error.response.data === "Refresh Token") {
            // console.log("Refresh Token");
            const refreshToken = localStorage.getItem("refreshToken");
            try {
              const res = await axios.get<{
                accessToken: string;
                refreshToken: string;
                isAdmin: boolean;
              }>(apiUrl + "api/UserContoller/RefreshToken", {
                params: { token: refreshToken },
              });

              // console.log(res.data);
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);
              dispatch(
                setAuthentication({
                  authanticated: true,
                  // isAdmin: res.data.isAdmin,
                })
              );
              error.config.headers["Authorization"] =
                "Bearer " + res.data.accessToken;

              return await API_INSTANCE.request(error.config);
            } catch (err) {
              // console.log(err);
              throw err;
            }
          } else {
            dispatch(setAuthentication({ authanticated: false }));
          }
        }
        // console.log("En dışa girmemeli");
        return Promise.reject(error);
      }
    );
  }, []);
};

export default useAxiosInterceptor;
