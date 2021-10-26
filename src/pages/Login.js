import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tryGetUsers, login } from "../redux/actions/account";

export default function FormDialog() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const userList = useSelector((state) => state.Account.userList);

  const handleLogin = () => {
    let convertId = parseInt(userId);
    const checkIdUser = userList.find(({ id }) => id === convertId);
    const checkEmailUser = userList.find(({ email }) => email === userEmail);
    console.log(checkIdUser, checkEmailUser);
    if (checkIdUser !== undefined && checkEmailUser !== undefined) {
      setOpen(false);
      alert("Success");
      dispatch(login(checkEmailUser));
      history.push("/admin");
    } else {
      alert("You're not an admin");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      dispatch(tryGetUsers());
      setOpen(true);
    } else {
      history.push("/admin");
    }
  }, [dispatch, history]);

  return (
    <div className="login-wrapper">
      <Dialog open={open}>
        <DialogTitle sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Login
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="userId"
            label="User ID"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push("/")}>Cancel</Button>
          <Button onClick={() => handleLogin()} variant="contained">
            LOGIN
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
