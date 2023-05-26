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

      <div className="flex-container flex-column community-container white-text no-top-padding down-nav">
        <div
          className="flex-container flex-content-space-evenly top-margin"
          /*Contenedor de la informacion de la comunidad*/
        >
          <img
            className="community-img"
            /*Imagen de la comunidad*/ src={require("../images/pocomDefUser.jpg")}
            alt="..."
            /*alt="Imagen de la comunidad"*/
          ></img>
          <h1 className="flex-container flex-column horizontal-spacing bold-text">
            Nombre de la comunidad
          </h1>
          <button id="Follow" className="white-text" onClick={FollowonClick}>
            Seguir
          </button>
        </div>
        <div className="flex-container">
          <p>Descripcion</p>
        </div>
      </div>

      <CreatePost></CreatePost>
      <Post></Post>
    </div>
  );
};

function FollowonClick() {
  let Follow = document.getElementById("Follow");

  if (Follow.classList.contains("invertbtn")) {
    Follow.classList.remove("invertbtn");
    Follow.textContent = "Seguir";
  } else {
    Follow.classList.add("invertbtn");
    Follow.textContent = "Siguiendo";
  }
}

export default Community;
