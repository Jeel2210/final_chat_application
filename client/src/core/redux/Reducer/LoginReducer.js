import { LOGIN_USER } from "../Constant";
const initState = {
  auth: [],
};
export const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case `${LOGIN_USER}_SUCCESS`:
      return {
        ...state,
        LoginResponse: action.payload,
      };
    case `FETCH_ERROR`:
      return {
        ...state,
        ApiError: action.payload,
      };

    default:
      return state;
  }
};
