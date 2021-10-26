import { combineReducers } from "redux";
import Account from "./reducers/account";
import Posts from "./reducers/posts";
import LikedPosts from "./reducers/likedPosts";

const rootReducer = combineReducers({
  Account,
  Posts,
  LikedPosts,
});

export default rootReducer;
