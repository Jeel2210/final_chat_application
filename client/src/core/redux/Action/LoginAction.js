import axiosCall from "../index";
import { LOGIN_USER } from "../Constant";

export const loginAuth = (data) => {
  const path = "/users/login";
  const responseType = LOGIN_USER;
  return axiosCall("post", path, responseType, data);
};
