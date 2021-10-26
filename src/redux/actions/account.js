import axios from "axios";
import { BASE_URL } from "../../api";

// Action Creator
export const login = (payload) => {
  return {
    type: "LOGIN",
    payload,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const getUsers = (payload) => {
  return {
    type: "GET_USERS",
    payload,
  };
};

// Action
export const tryGetUsers = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${BASE_URL}/users`);
      dispatch(getUsers(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
