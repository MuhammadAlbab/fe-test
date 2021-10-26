import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import { getLikedPosts } from "../redux/actions/likedPosts";

const LikedPosts = () => {
  const dispatch = useDispatch();
  const likedPosts = useSelector((state) => state.LikedPosts);
  useEffect(() => {
    if (localStorage.getItem("likedPosts") === null) {
      return;
    } else {
      const likedFromLS = localStorage.getItem("likedPosts");
      dispatch(getLikedPosts(JSON.parse(likedFromLS)));
    }
  }, [dispatch]);
  return (
    <>
      <Navbar pageTitle={"Liked Posts"} />
      {likedPosts && <CardList dataFrom={likedPosts} />}
      {likedPosts.data.length === 0 && (
        <div className="warn-to-like">You have not like any post</div>
      )}
    </>
  );
};

export default LikedPosts;
