import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/account";

const Navbar = ({ pageTitle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0.5 }}
          onClick={() => history.push("/")}
        >
          <HomeIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          {pageTitle}
        </Typography>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0.5 }}
          onClick={() => history.push("/liked-posts")}
        >
          <FavoriteIcon sx={{ fontSize: 30 }} />
        </IconButton>
        {isLogin ? (
          <>
            <Button
              color="inherit"
              onClick={() => history.push("/admin")}
              sx={{ fontSize: 20 }}
            >
              ADMIN
            </Button>
            <Button
              color="inherit"
              onClick={() => handleLogout()}
              sx={{ fontSize: 20 }}
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => history.push("/login")}
            sx={{ fontSize: 20 }}
          >
            LOGIN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
