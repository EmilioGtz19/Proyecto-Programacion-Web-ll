import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="Nav flex-container flex-content-space-bt flex-item-center y-padding">
      {/*Logo*/}

      <div className="white-text horizontal-spacing"> Logo </div>

      {/*Barra de busqueda(?)*/}
      <form className="flex-container half-width">
        <input type="text" class="Search full-width"></input>
        <button type="submit" class="Search-Submit">
          {" "}
          <img
            class="Search-Submit-Img"
            src={require("../images/pocomSearch.png")}
            alt="..."
          ></img>
        </button>
      </form>
      {/*Botones de navegacion*/}

      {/*Perfil*/}
      <div className="User User-margin dropdown">
        {/*Dropdown*/}
        <div className="flex-container flex-item-center">
          <img
            class="Nav-Userimg"
            src={require("../images/pocomDefUser.jpg")}
            alt="..."
          ></img>
          <p className="white-text ">🢓</p>
        </div>

        <div class="dropdown-content white-text">
          <p>Perfil</p>
          <hr></hr>
          <p>Cerrar Sesion</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
