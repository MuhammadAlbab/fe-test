const initialState = {
  data: [],
};
const likedPosts = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_LIKED_POSTS":
      return {
        ...state,
        data: [...payload],
      };

    case "FAILED_TO_GET_LIKED_POSTS":
      return {
        ...state,
        data: [],
        message: "fail to load LIKED POSTS data",
      };
    case "LIKE_POST":
      const newLikedPostsData = [...state.data, payload];
      localStorage.setItem(
        "likedPosts",
        `${JSON.stringify(newLikedPostsData)}`
      );
      return {
        ...state,
        data: [...newLikedPostsData],
      };

    case "DISLIKE_POST":
      let newDislikePostsData = state.data.filter((e) => e.id !== payload.id);
      localStorage.setItem(
        "likedPosts",
        `${JSON.stringify(newDislikePostsData)}`
      );
      return {
        ...state,
        data: [...newDislikePostsData],
      };
    default:
      return state;
  }
};

export default likedPosts;
