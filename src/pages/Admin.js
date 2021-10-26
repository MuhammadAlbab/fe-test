import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { getPostsDataById } from "../redux/actions/posts";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Posts = useSelector((state) => state.Posts);

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      history.push("/login");
    } else {
      const currentUser = localStorage.getItem("currentUser");
      const parseCU = JSON.parse(currentUser);
      dispatch(getPostsDataById(parseCU.id));
    }
  }, [dispatch, history]);

  return (
    <>
      <Navbar pageTitle={"Admin"} />
      <CardList dataFrom={Posts} isAdmin={true} />
      <Fab
        color="primary"
        aria-label="add"
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => history.push("/admin/create")}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Admin;
