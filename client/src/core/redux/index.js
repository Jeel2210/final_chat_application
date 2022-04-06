import axios from "axios";

export const instance = axios.create({
  baseURL: `http://192.168.1.164:3000/`,
});

// export default function axiosCall(method, url, responseType, data, headers) {
//   console.log("helo api");
//   return (dispatch) => {
//     const apiData = {
//       method,
//       url,
//       data,
//       headers,
//     };
//     instance({ method: `${method}`, url: `${url}`, data: `${data}` })
//       .then((response) => {
//         if (response.data) {
//           console.log("respo");
//           dispatch({ type: `${responseType}`, payload: response.data });
//           return response.data;
//         }
//       })
//       .catch((err) => {
//         if (err.response && err.response.data) {
//           dispatch({
//             type: `${responseType}_ERROR`,
//             payload: err.response.data,
//           });
//           // if (err.response.data.message === 'Full authentication is required to access this resource') {
//           //   callLogout();
//           // }
//           return err.response.data;
//         }
//         if (
//           err.response &&
//           err.response.data &&
//           err.response.data.error === "Internal Server Error"
//         ) {
//           // callLogout();
//           dispatch({
//             type: "FETCH_ERROR",
//             payload: err.response || "Something Went Wrong.",
//           });
//           return err.response;
//         }
//       });
//   };
// }
