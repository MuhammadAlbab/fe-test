import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";

export default function CardModal({ open, setOpen, data, type }) {
  const { id, title, body } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [editTitle, setTitle] = useState("");
  const [editBody, setBody] = useState("");
  const [postComments, setPostComments] = useState([]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      console.log(response);
      alert(
        "Berhasil menghapus, silahkan lihat response di log atau console.log()"
      );
    } catch (error) {
      alert("Tejadi kesalahan");
      console.log(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleEditSave = async () => {
    try {
      var data;
      if (editTitle === "" && editBody === "") {
        alert("Title atau Body cant be empty");
      } else if (editTitle === "" && editBody !== "") {
        data = {
          body: editBody,
        };
        setIsLoading(true);
        let response = await axios.patch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          data
        );
        console.log(response);
        alert("Berhasil update data, silahkan cek di log atau console.log");
      } else if (editTitle !== "" && editBody === "") {
        data = {
          title: editTitle,
        };
        setIsLoading(true);
        let response = await axios.patch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          data
        );
        console.log(response);
        alert("Berhasil update data, silahkan cek di log atau console.log");
      } else {
        data = {
          title: editTitle,
          body: editBody,
        };
        setIsLoading(true);
        let response = await axios.patch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          data
        );
        console.log(response);
        alert("Berhasil update data, silahkan cek di log atau console.log");
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi Kesalahan");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsLoading(true);
        let response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setPostComments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getComments();
    return () => {
      setPostComments([]);
    };
  }, [id]);

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {type === "Read" && (
          <>
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  fontSize: "1.7rem",
                }}
              >
                {body}
              </DialogContentText>
              <div className="comments-wrapper">
                <div className="comments-header">Comments</div>
                <div className="comments-items-wrapper">
                  {isLoading ? (
                    <div className="loading-comments">Loading comments.. </div>
                  ) : (
                    <>
                      {postComments.map((e) => (
                        <div className="comment-item">
                          <div className="comment-item-name">{e.email}</div>
                          <div className="comment-item-body">{e.body}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogActions sx={{ paddingRight: "3rem" }}>
              <Button
                onClick={() => setOpen(false)}
                sx={{ fontSize: "1.5rem", color: "black" }}
              >
                CLOSE
              </Button>
            </DialogActions>
          </>
        )}
        {type === "Delete" && (
          <>
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                fontSize: "2rem",

                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              ARE YOU SURE TO DELETE <br /> <b>"{title}"</b> ?
            </DialogTitle>

            <DialogActions sx={{ paddingRight: "3rem" }}>
              <Button
                onClick={() => handleDelete()}
                sx={{ fontSize: "1.5rem", color: "red" }}
              >
                {isLoading ? "Loading..." : "DELETE"}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                sx={{ fontSize: "1.5rem", color: "blue" }}
              >
                CANCEL
              </Button>
            </DialogActions>
          </>
        )}
        {type === "Edit" && (
          <>
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              EDIT
            </DialogTitle>
            <DialogContent>
              <div className="input-edit-wrapper">
                <input
                  type="text"
                  placeholder={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  type="textarea"
                  placeholder={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions sx={{ paddingRight: "3rem" }}>
              <Button
                onClick={() => setOpen(false)}
                sx={{ fontSize: "1.5rem", color: "orange" }}
              >
                CLOSE
              </Button>
              <Button
                onClick={() => handleEditSave()}
                sx={{ fontSize: "1.5rem", color: "green" }}
              >
                {isLoading ? "Loading..." : "SAVE"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
