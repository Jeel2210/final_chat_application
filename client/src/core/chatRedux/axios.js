/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// Create instance called instance
const instance = axios.create({
  baseURL: `http://192.168.1.164:8000/`,
  // headers: {
  //   "content-type": "multipart/form-data",
  // },
});

export default {
  postData: (data) =>
    instance({
      method: "POST",
      url: `/multiple-file`,
      data: data,
    }),

  groupFileUpload: (data) =>
    instance({
      method: "POST",
      url: `/multiple-group-file`,
      data: data,
    }),

  getAllUsers: (header) =>
    instance({
      method: "GET",
      url: "/users",
      headers: header,
    }),

  getUserGroups: (header) =>
    instance({
      method: "GET",
      url: "/groupList",
      headers: header,
    }),

  LoginUser: (data, headers) =>
    instance({
      method: "POST",
      url: "/users/login",
      data: data,
      headers: headers,
    }),

  RegisterUser: (data, headers) =>
    instance({
      method: "POST",
      url: "/users/register",
      data: data,
      headers: headers,
    }),
};
