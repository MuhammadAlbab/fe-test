const initialState = {
  data: [],
  dataById: [],
  page: 1,
  message: "",
  isLoading: false,
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_POSTS":
      return {
        ...state,
        data: [...state.data, ...payload],
        message: "success to load POSTS data",
      };
    case "GET_POSTS_BY_ID":
      return {
        ...state,
        dataById: [...payload],
        message: "success to load POSTS BY ID data",
      };
    case "CLEAN_UP":
      return {
        ...state,
        data: [],
        page: 1,
        message: "clean up",
      };
    case "LOADING_TO_GET_POSTS":
      return {
        ...state,
        isLoading: payload,
      };
    case "FAILED_TO_GET_POSTS":
      return {
        ...state,
        data: [],
        message: "failed to load POSTS data",
      };
    case "INCREMENT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default postsReducer;
