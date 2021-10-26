// Action Creator
export const getLikedPosts = (payload) => {
  return {
    type: "GET_LIKED_POSTS",
    payload,
  };
};

export const failedToGetLikedPosts = () => {
  return {
    type: "FAILED_TO_GET_LIKED_POSTS",
  };
};

export const likePost = (payload) => {
  return {
    type: "LIKE_POST",
    payload,
  };
};

export const dislikePost = (payload) => {
  return {
    type: "DISLIKE_POST",
    payload,
  };
};
