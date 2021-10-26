import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsData, incrementPage, cleanUp } from "../redux/actions/posts";
import { getLikedPosts } from "../redux/actions/likedPosts";
import Navbar from "../components/Navbar";
import CardList from "../components/CardList";

const Homepage = () => {
  const dispatch = useDispatch();
  const Posts = useSelector((state) => state.Posts);

  useEffect(() => {
    dispatch(getPostsData(1));
    dispatch(incrementPage());
    const likedFromLS = localStorage.getItem("likedPosts");
    dispatch(getLikedPosts(JSON.parse(likedFromLS)));
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch]);

  window.onscroll = function (ev) {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      if (Posts.data.length !== 100) {
        dispatch(incrementPage());
        dispatch(getPostsData(Posts.page));
      }
    }
  };

  return (
    <>
      <Navbar pageTitle={"Homepage"} />
      <CardList dataFrom={Posts} />
      {Posts.data.length === 100 && (
        <div className="reached">You have seen it all!</div>
      )}
    </>
  );
};

export default Homepage;
