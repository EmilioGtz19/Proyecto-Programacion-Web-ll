import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/NavBar.css";
import { logout } from "../utils/logout";
import ComModal from "../pages/CommunityModal.js";
import ComAdModal from "../pages/CommunityAdminModal.js";

const NavBar = () => {
  return (
    <div className="Nav flex-container flex-content-space-bt flex-item-center y-padding">
      {/*Logo*/}

      <div className="white-text horizontal-spacing"> Logo </div>

      <button class="white-text" onClick={showcommunities}>
        Comunidades
      </button>

      {/*Barra de busqueda(?)*/}
      <form className="flex-container half-width">
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

      <button class="white-text" onClick={showAdmincommunities}>
        Comunidades administradas
      </button>

      {/*Botones de navegacion*/}

      {/*Perfil*/}
      <div className="User User-margin dropdown">
        {/*Dropdown*/}
        <div className="flex-container flex-item-center">
          <img
            className="Nav-Userimg"
            src={require("../images/pocomDefUser.jpg")}
            alt="..."
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
      <ComModal id="modal-container" style={{display:`none`}}></ComModal>

      <ComAdModal id="modal-id-container"></ComAdModal>
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
function showAdmincommunities() {
  var seccc = document.getElementById("modal-id-container");
  if (seccc.style.display === "none") {
    seccc.style.display = "block";
  } else {
    seccc.style.display = "none";
  }
}

export default NavBar;
