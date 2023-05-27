import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";

const Post = () => {
  {
    /*   const [likedislikeCtrl, setlikedislikeCtrl] = useState(0);
     */
  }

  return (
    <div
      className="flex-container flex-column post-container white-text no-top-padding" /*Contenedor del contenido*/
    >
      {/* community */}
      <div
        className="flex-container flex-content-start top-margin"
        /*Contenedor de la informacion de la comunidad*/
      >
        <img
          className="post-Userimg "
          /*Imagen de la comunidad*/ src={require("../images/pocomDefUser.jpg")}
          alt="..."
          /*alt="Imagen de la comunidad"*/
        ></img>
        <p className="flex-container flex-column horizontal-spacing bold-text">
          Nombre de la comunidad
        </p>
        <p className="flex-container flex-column horizontal-spacing">
          Nombre del usuario
        </p>
        <p className="flex-container flex-column horizontal-spacing-r small-text">
          Fecha de pub
        </p>
      </div>
      <div
        className="top-margin" /*Contenedor de la informacion del contenido e imagenes*/
      >
        <h1 className="big-text">Titulo</h1>
        <p>Texto de la publicacion</p>
        <div className="flex-container">
          <img
            className="post-Image"
            /*Imagenes*/ src={require("../images/pocomDefImg.png")}
            alt="..."
          ></img>
        </div>
      </div>
      <div className="top-margin" /*Botones de mas acciones*/>
        <button id="Like" className="white-text" onClick={LikeonClick}>
          Like
        </button>
        <button
          id="DisLike"
          className="white-text horizontal-spacing"
          onClick={DislikeonClick}
        >
          Dislike
        </button>
        <button className="white-text">Comentarios</button>
      </div>
    </div>
  );
};

function LikeonClick() {
  let Like = document.getElementById("Like");
  let DisLike = document.getElementById("DisLike");

  if (Like.classList.contains("invertbtn")) {
    console.log("Like no se esta invertodo");
    Like.classList.remove("invertbtn");
  } else {
    console.log("Like se esta invertodo");
    Like.classList.add("invertbtn");
    if (DisLike.classList.contains("invertbtn")) {
      DisLike.classList.remove("invertbtn");
    }
  }
}

function DislikeonClick() {
  let Like = document.getElementById("Like");
  let DisLike = document.getElementById("DisLike");

  if (DisLike.classList.contains("invertbtn")) {
    console.log("Like no se esta invertodo");
    DisLike.classList.remove("invertbtn");
  } else {
    console.log("Like se esta invertodo");
    DisLike.classList.add("invertbtn");
    if (Like.classList.contains("invertbtn")) {
      Like.classList.remove("invertbtn");
    }
  }
}

export default Post;
