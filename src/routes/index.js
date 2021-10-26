import Homepage from "../pages/Homepage";
import Admin from "../pages/Admin";
import AdminCreate from "../pages/AdminCreate";
import Login from "../pages/Login";
import LikedPosts from "../pages/LikedPosts";

const Routes = [
  {
    path: "/",
    exact: true,
    component: () => <Homepage />,
  },
  {
    path: "/admin/create",
    exact: false,
    component: () => <AdminCreate />,
  },
  {
    path: "/admin",
    exact: false,
    component: () => <Admin />,
  },
  {
    path: "/login",
    exact: false,
    component: () => <Login />,
  },
  {
    path: "/liked-posts",
    exact: false,
    component: () => <LikedPosts />,
  },
  {
    path: "*",
    exact: false,
    component: () => <div>404 Page not found</div>,
  },
];

export default Routes;
