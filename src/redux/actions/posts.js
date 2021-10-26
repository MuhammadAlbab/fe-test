import axios from "axios";
import { BASE_URL } from "../../api";

// Action Creator
export const getPosts = (payload) => {
  return {
    type: "GET_POSTS",
    payload,
  };
};

export const getPostsById = (payload) => {
  return {
    type: "GET_POSTS_BY_ID",
    payload,
  };
};

export const loadingToGetPosts = (payload) => {
  return {
    type: "LOADING_TO_GET_POSTS",
    payload,
  };
};

export const cleanUp = () => {
  return {
    type: "CLEAN_UP",
  };
};

export const incrementPage = () => {
  return {
    type: "INCREMENT_PAGE",
  };
};

export const failedToGetPosts = () => {
  return {
    type: "FAILED_TO_GET_POSTS",
  };
};

// Action
export const getPostsData = (param) => {
  const page = param.toString();
  return async (dispatch) => {
    try {
      dispatch(loadingToGetPosts(true));
      let response = await axios.get(
        `${BASE_URL}/posts?_page=${page}&_limit=5`
      );
      dispatch(getPosts(response.data));
    } catch (err) {
      console.log(err);
      dispatch(failedToGetPosts());
    } finally {
      dispatch(loadingToGetPosts(false));
    }
  };
};

export const getPostsDataById = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingToGetPosts(true));
      let response = await axios.get(`${BASE_URL}/posts?userId=${userId}`);
      dispatch(getPostsById(response.data));
    } catch (err) {
      console.log(err);
      dispatch(failedToGetPosts());
    } finally {
      dispatch(loadingToGetPosts(false));
    }
  };
};
