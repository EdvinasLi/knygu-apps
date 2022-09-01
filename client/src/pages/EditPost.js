import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FilePresent } from "@mui/icons-material";

const EditPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({
    title: "",
    author: "",
    image: "",
    book_author: "",
    isbn: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/posts/" + id, post)
      .then((resp) => {
        if (!resp.data) {
          navigate("/home");
          return;
        }

        setPost(resp.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/home");
      });
  }, []);

  const handleForm = (e) => {
    setPost({
      ...post,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postForm = new FormData();

    for (const entry in post) {
      postForm.append(entry, post[entry]);
    }

    axios
      .post(`/api/posts/edit/` + id, postForm)
      .then((resp) => {
        setAlert({
          message: resp.data.message,
          status: "success",
        });

        window.scrollTo(0, 0);

        setTimeout(() => navigate("/home"), 2000);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        window.scrollTo(0, 0);

        if (error.response.status === 401)
          setTimeout(() => navigate("/login"), 2000);
      });
  };

  return (
    <div className="container">
      <h2>Įrašo redagavimas</h2>
      {alert.message && (
        <div className={"alert alert-" + alert.status}>{alert.message}</div>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label>Pavadinimas:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={(e) => handleForm(e)}
            value={post.title}
          />
        </div>
        <div className="form-group mb-2">
          <label>Autorius:</label>
          <input
            type="text"
            name="author"
            className="form-control"
            onChange={(e) => handleForm(e)}
            value={post.author}
          />
        </div>
        <div className="form-group mb-2">
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            className="form-control"
            onChange={(e) => handleForm(e)}
            value={post.isbn}
          />
        </div>
        <div className="form-group mb-2">
          <label>Knygos autorius:</label>
          <input
            type="text"
            name="book_author"
            className="form-control"
            onChange={(e) => handleForm(e)}
            value={post.book_author}
          />
        </div>
        <div className="form-group mb-2">
          <label>Nuotrauka:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div className="form-group mb-2">
          <img src={post.image} alt={post.title} style={{ maxWidth: 150 }} />
        </div>
        <button className="btn btn-primary">Siųsti</button>
      </form>
    </div>
  );
};

export default EditPost;
