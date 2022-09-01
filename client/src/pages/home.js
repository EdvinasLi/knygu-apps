import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import axios from "axios";
import "./home.css";
import {
  ReadMore,
  DeleteOutlined,
  DriveFileRenameOutline,
} from "@mui/icons-material";
const Home = (props) => {
  const { loggedIn } = props;
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });
  const [keyword, setKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/posts/").then((resp) => {
      if (resp.data.message) {
        setAlert({
          message: resp.data.message,
          status: "danger",
        });
        return;
      }

      setPosts(resp.data);
    });
  }, [refresh]);

  const handleDelete = (id) => {
    if (isNaN(id) || !loggedIn) return;

    axios
      .delete("/api/posts/delete/" + id, {})

      .then((resp) => {
        console.log(resp);
        setAlert({
          message: resp.message,
          status: "success",
        });
        setRefresh(!refresh);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        window.scrollTo(0, 0);
        if (error.response.status === 401)
          setTimeout(() => navigate("/login"), 2000);
      })
      .finally(() => {
        setTimeout(
          () =>
            setAlert({
              message: "",
              status: "",
            }),
          3000
        );
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword === "") return setRefresh(!refresh);

    axios
      .get("/api/posts/search/" + keyword)
      .then((resp) => {
        setPosts(resp.data);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
        window.scrollTo(0, 0);
      })
      .finally(() => {
        setTimeout(
          () =>
            setAlert({
              message: "",
              status: "",
            }),
          3000
        );
      });
  };

  return (
    <div className="backDiv">
      <div className="container">
        {alert.message && (
          <div className={"alert alert-" + alert.status}>{alert.message}</div>
        )}
        <div className="filter">
          <form onSubmit={handleSearch}>
            <div className="searchDiv">
              <input
                type="text"
                className="searchBar"
                placeholder="Paieska"
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={(e) => {
                  if (keyword === "") setRefresh(!refresh);
                }}
              />

              <button className="searchBttn">Ieskoti</button>
            </div>
          </form>
        </div>
        <div className="articles">
          {posts.length > 0 &&
            posts.map((article) => {
              return (
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p> ISBN: {article.isbn}</p>
                      <p> Knygos autorius: {article.book_author}</p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={"/post/" + article.id}>
                      <ReadMore />
                    </Link>
                    {loggedIn && (
                      <div className="buttonsDiv">
                        <Link to={"/edit/" + article.id}>
                          <DriveFileRenameOutline />
                        </Link>
                        <button onClick={() => handleDelete(article.id)}>
                          <DeleteOutlined className="deleteIcon" />
                        </button>
                      </div>
                    )}
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
