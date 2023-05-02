import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";
import NavBar from "../pages/NavBar.js";
import CreatePost from "../pages/CreatePost.js";
import FilterPost from "../pages/FilterPost.js";
import Post from "../pages/Post.js";

const Community = () => {
  return (
    <div className="flex-container flex-column gap center">
      <NavBar></NavBar>

      {/*Community Page info*/}

      <CreatePost></CreatePost>
      <FilterPost></FilterPost>
      <Post></Post>
    </div>
  );
};

export default Community;
