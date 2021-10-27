import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminCreate = () => {
  const history = useHistory();
  const [theTitle, setTitle] = useState("");
  const [theBody, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.Account.currentUser);

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      history.push("/login");
    }
  }, [history]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const data = {
        title: theTitle,
        body: theBody,
        userId: currentUser.id,
      };
      let response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        data
      );
      alert(
        `${response.data.title} Berhasil ditambahkan, silahkan lihat response di log atau console.log()`
      );
      console.log(response);
      history.push("/admin");
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="admin-create-wrapper">
      <div className="navbar-wrapper">
        <div className="title-navbar">Create Post</div>
        <div className="btn-wrapper" onClick={() => history.push("/admin")}>
          X
        </div>
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="btn-save-wrapper">
          <div className="btn-save" onClick={handleSave}>
            {isLoading ? "Loading..." : "SAVE"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreate;
