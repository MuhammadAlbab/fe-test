const initialState = {
  userList: [],
  currentUser: [],
};
const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        userList: [...payload],
      };
    case "LOGIN":
      const newCurrentUser = payload;
      localStorage.setItem("currentUser", `${JSON.stringify(newCurrentUser)}`);
      return {
        ...state,
        currentUser: newCurrentUser,
      };
    case "LOGOUT":
      localStorage.removeItem("currentUser");
      return {
        ...state,
        currentUser: [],
      };
    default:
      return state;
  }
};

export default accountReducer;
