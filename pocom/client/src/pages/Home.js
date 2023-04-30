import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";

const Home = () => {
  return (
    <div
      className="flex-container flex-column gap center" /*contenedor de los posts, hacer box rellena*/
    >
      <div
        className="flex-container flex-column post-container white-text no-top-padding" /*Contenedor del contenido*/
      >
        <div
          className="flex-container flex-content-start top-margin"
          /*Contenedor de la informacion del usuario*/
        >
          <img
            className="post-Userimg "
            /*Imagen del usuario*/ src={require("../images/pocomDefUser.jpg")}
            /*alt="Imagen del usuario"*/
          ></img>
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
            ></img>
          </div>
        </div>
        <div className="top-margin" /*Botones de mas acciones*/>
          <button className="white-text">Like</button>
          <button className="white-text horizontal-spacing">Dislike</button>
          <button className="white-text">Comentarios</button>
        </div>
      </div>

      {/*-------*/}
      <div
        className="flex-container flex-column post-container white-text no-top-padding" /*Contenedor del contenido*/
      >
        <div
          className="flex-container flex-content-start top-margin"
          /*Contenedor de la informacion del usuario*/
        >
          <img
            className="post-Userimg "
            /*Imagen del usuario*/ src={require("../images/pocomDefUser.jpg")}
            /*alt="Imagen del usuario"*/
          ></img>
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
          <img /*Imagenes*/ src=""></img>
        </div>
        <div /*Botones de mas acciones*/>
          <button className="white-text">Like</button>
          <button className="white-text horizontal-spacing">Dislike</button>
          <button className="white-text">Comentarios</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
