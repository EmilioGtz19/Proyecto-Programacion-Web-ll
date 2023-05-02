import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";

const FilterPost = () => {
  return (
    <div
      className="flex-container flex-column post-container white-text no-top-padding"
      /*Contenedor de la informacion de la comunidad*/
    >
      <div
        className="top-margin flex-container flex-item-center" /*Contenedor de la informacion del contenido e imagenes*/
      >
        <button>Filtros</button>
      </div>
    </div>
  );
};

export default FilterPost;
