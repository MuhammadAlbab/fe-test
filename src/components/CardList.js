import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, dislikePost } from "../redux/actions/likedPosts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CardModal from "./CardModal";

const CardList = ({ dataFrom, isAdmin = false }) => {
  const dispatch = useDispatch();
  const likedPosts = useSelector((state) => state.LikedPosts.data);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState({});
  const [modalType, setModalType] = useState("");

  const handleLikeDislike = (e) => {
    const checkLikedPosts = likedPosts.find(({ id }) => id === e.id);
    if (checkLikedPosts === undefined) {
      dispatch(likePost(e));
    } else {
      dispatch(dislikePost(e));
    }
  };

  const handleRead = (e) => {
    setModalState(e);
    setModalType("Read");
    setModalOpen(true);
  };

  const handleDelete = (e) => {
    setModalState(e);
    setModalType("Delete");
    setModalOpen(true);
  };

  const handleEdit = (e) => {
    setModalState(e);
    setModalType("Edit");
    setModalOpen(true);
  };

  return (
    <>
      {isAdmin ? (
        <>
          <div className="card-items-container">
            {dataFrom &&
              dataFrom.dataById.map((e, index) => (
                <div className="card-item-wrapper" key={index}>
                  <div className="content-wrapper">
                    <div className="title" onClick={() => handleRead(e)}>
                      {e.title}
                    </div>
                    <div className="subtitle">{e.body}</div>
                  </div>
                  <div className="love-wrapper">
                    <DeleteIcon
                      fontSize="inherit"
                      sx={{ transition: "0.2s ease-in-out", color: "red" }}
                      onClick={() => handleDelete(e)}
                    />
                    <div style={{ margin: "1rem" }}></div>
                    <EditIcon
                      fontSize="inherit"
                      sx={{ transition: "0.2s ease-in-out", color: "orange" }}
                      onClick={() => handleEdit(e)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="card-items-container">
          {dataFrom &&
            dataFrom.data.map((e) => (
              <div className="card-item-wrapper" key={e.id}>
                <div className="content-wrapper" onClick={() => handleRead(e)}>
                  <div className="title">{e.title}</div>
                  <div className="subtitle">{e.body}</div>
                </div>
                <div
                  className="love-wrapper"
                  onClick={() => handleLikeDislike(e)}
                >
                  <FavoriteIcon
                    color={
                      likedPosts.find(({ id }) => id === e.id) === undefined
                        ? "action"
                        : "inherit"
                    }
                    fontSize="inherit"
                    sx={{ transition: "0.2s ease-in-out" }}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
      {isAdmin ? null : (
        <>{dataFrom.isLoading && <div className="isLoading">Loading...</div>}</>
      )}
      <CardModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={modalState}
        type={modalType}
      />
    </>
  );
};

export default CardList;
