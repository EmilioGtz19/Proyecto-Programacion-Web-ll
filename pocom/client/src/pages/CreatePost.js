import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";

const CreatePost = () => {
  return (
    <div
      className="flex-container flex-column post-container white-text no-top-padding down-nav"
      /*Contenedor de la informacion de la comunidad*/
    >
      <div className="top-margin flex-container flex-item-center">
        {/*Crear un boton de crear post*/}
        <button id="Publish" className="white-text" onClick={PublishPost}>
          Crear Post
        </button>
      </div>

      <div
        id="PublishCtrl"
        className="top-margin flex-container flex-item-center" /*Contenedor de la informacion del contenido e imagenes*/
        style={{ display: `none` }}
      >
        <div
          id="CreadorDePosts"
          className="flex-container flex-column full-width"
        >
          <input type="text" placeholder="Titulo del Post"></input>
          <input type="text" placeholder="Contenido del Post"></input>
          <div
            id="CreadorDePosts"
            className="flex-container flex-content-space-bt full-width"
          >
            <input
              type="file"
              accept="image/*"
              onChange={""}
              placeholder="AgregarImagen"
            />
            <button className="white-text"> publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PublishPost() {
  let Publish = document.getElementById("Publish");
  let PublishCtrl = document.getElementById("PublishCtrl");
  console.log(PublishCtrl.style.display);
  if (PublishCtrl.style.display === "none") {
    PublishCtrl.style.display = "block";
  } else {
    PublishCtrl.style.display = "none";
  }

  if (Publish.classList.contains("invertbtn")) {
    Publish.classList.remove("invertbtn");
    Publish.textContent = "Crear Post";
  } else {
    Publish.classList.add("invertbtn");
    Publish.textContent = "Cerrar";
  }
}

export default CreatePost;
