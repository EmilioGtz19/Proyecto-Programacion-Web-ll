import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";

const CreatePost = () => {
  return (
    <div
      className="flex-container flex-column post-container white-text no-top-padding"
      /*Contenedor de la informacion de la comunidad*/
    >
      <div
        className="top-margin flex-container flex-item-center" /*Contenedor de la informacion del contenido e imagenes*/
      >
        <img
          className="post-Userimg"
          /*Imagenes*/ src={require("../images/pocomDefUser.jpg")}
          alt="..."
        ></img>
        <div
          id="CreadorDePosts"
          className="flex-container horizontal-spacing full-width"
        >
          <input type="text" placeholder="Crear un post"></input>
          <button className="white-text btn-middle"> Subir una imagen</button>
          <button className="white-text"> publish</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
