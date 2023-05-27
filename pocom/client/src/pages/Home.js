import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";
import NavBar from "../pages/NavBar.js";
import CreatePost from "../pages/CreatePost.js";
import FilterPost from "../pages/FilterPost.js";
import Post from "../pages/Post.js";

const Home = () => {
  return (
    <div
      className="flex-container flex-column gap center top-margin " /*contenedor de los posts, hacer box rellena*/
    >
      <NavBar></NavBar>
      {/* Crear Posts */}
      <div className="down-Nav"></div>
      {/* Filtrar Posts
      <FilterPost></FilterPost>*/}
      {/*-------*/}

      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </div>
  );
};

export default Home;
