import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";
import NavBar from "../pages/NavBar.js";
import CreatePost from "../pages/CreatePost.js";
import Post from "../pages/Post.js";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Community = (props) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const { communityName } = useParams();
  const [communityData, setCommunityData] = useState([]);
  const [followData, setFollowData] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/community/getCommunityByName/${communityName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => {
        setCommunityData(data);
      });
  }, [apiUrl, communityName, props.user.id]);

  useEffect(() => {
    fetch(`${apiUrl}/api/community_user/getFollowOrUnfollow/${props.user.id}/${communityData.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => {
        setFollowData(data);
        updateButtonFollow();
      });
  }, [apiUrl, props.user.id, communityData.id, followData.follow])

  async function followOrUnfollow() {
    try {
      
      const response = await fetch(`${apiUrl}/api/community_user/followOrUnfollowCommunity/${props.user.id}/${communityData.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json();
      console.log(data)
      setFollowData(data.follow);
      updateButtonFollow();

    } catch (error) {
      console.log(error.message)
    }
  }

  function updateButtonFollow() {
    let Follow = document.getElementById("Follow");
    if (Follow.classList.contains("invertbtn") && followData.follow === 0) {
      Follow.classList.remove("invertbtn");
      Follow.textContent = "Seguir";
    } else {
      Follow.classList.add("invertbtn");
      Follow.textContent = "Siguiendo";
    }
  }

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
            /*Imagen de la comunidad*/ src={communityData.community_photo}
            alt="..."
          /*alt="Imagen de la comunidad"*/
          ></img>
          <h1 className="flex-container flex-column horizontal-spacing bold-text">
            {communityData.community_name}
          </h1>
          <button id="Follow" className="white-text" onClick={followOrUnfollow}>
            Seguir
          </button>
        </div>
        <div className="flex-container">
          <p>{communityData.community_description}</p>
        </div>
      </div>

      <CreatePost user_id={props.user.id} community_id={communityData.id}></CreatePost>
      <Post></Post>
    </div>
  );
};



export default Community;
