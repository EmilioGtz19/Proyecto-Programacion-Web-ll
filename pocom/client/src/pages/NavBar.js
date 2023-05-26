import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/NavBar.css";
import { useEffect } from "react";
import { logout } from "../utils/logout";
import ComModal from "../pages/CommunityModal.js";

const NavBar = (props) => {
  useEffect(() => {
    var secc = document.getElementById("modal-container");
    //var seccc = document.getElementById("modal-id-container");
    secc.style.display = "none";
    //seccc.style.display = "none";
  }, []);

  return (
    <div
      className="Nav flex-container flex-content-space-bt 
    flex-item-center y-padding"
    >
      {/*Logo*/}
      <div className="flex-container flex-content-space-bt flex-item-center y-padding Logo">
        <div className="white-text horizontal-spacing">
          <a href="/home">
            <img
              className="Nav-Userimg"
              src={require("../images/kitten.jpg")}
              alt="..."
            ></img>
          </a>
        </div>

        <button className="white-text Community" onClick={showcommunities}>
          Comunidades
        </button>
      </div>

      {/*Barra de busqueda(?)*/}
      <form className="flex-container half-width center-absolute">
        <input type="text" className="Search full-width"></input>
        <button type="submit" className="Search-Submit">
          {" "}
          <img
            className="Search-Submit-Img"
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
            className="Nav-Userimg"
            src={props.image}
            alt="user"
          ></img>
          <p className="white-text">🢓</p>
        </div>

        <div className="dropdown-content white-text">
          <a href="/profile">Perfil</a>
          <hr></hr>
          <a href="/login" onClick={logout}>
            Cerrar sesión
          </a>
          <hr></hr>
          <a href="/ManageCommunities">Mis comunidades</a>
        </div>
      </div>
      <ComModal id="modal-container" style={{ display: `none` }}></ComModal>
    </div>
  );
};

function showcommunities() {
  var secc = document.getElementById("modal-container");
  if (secc.style.display === "none") {
    secc.style.display = "block";
  } else {
    secc.style.display = "none";
  }
}

/*
function showAdmincommunities() {
  var seccc = document.getElementById("modal-id-container");
  if (seccc.style.display === "none") {
    seccc.style.display = "block";
  } else {
    seccc.style.display = "none";
  }
}*/

export default NavBar;
