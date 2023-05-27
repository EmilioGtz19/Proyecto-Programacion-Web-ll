import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";
import NavBar from "../pages/NavBar.js";

const Home = (props) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/posts/getPostsByUsersFollows/${props.user.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => {
        setPostsData(data);
      });
  }, [])

  return (
    <div
      className="flex-container flex-column gap center top-margin " /*contenedor de los posts, hacer box rellena*/
    >
      <NavBar></NavBar>
      {/* Crear Posts */}

      <div className="down-Nav"></div>

      {postsData.length > 0 ? (
        postsData.map((post) => (
          <div
            className="flex-container flex-column post-container white-text no-top-padding" /*Contenedor del contenido*/
            key={post.dataValues.id}
          >
            {/* community */}
            <div
              className="flex-container flex-content-start top-margin"
            /*Contenedor de la informacion de la comunidad*/
            >
              <img
                className="post-Userimg "
            /*Imagen de la comunidad*/ src={post.community_info.community_photo}
                alt="..."
              /*alt="Imagen de la comunidad"*/
              ></img>
              <p className="flex-container flex-column horizontal-spacing bold-text">
                {post.community_info.community_name}
              </p>
              <p className="flex-container flex-column horizontal-spacing">
                {post.user_info.first_name}
              </p>
              <p className="flex-container flex-column horizontal-spacing-r small-text">
                {post.dataValues.createdAt}
              </p>
            </div>
            <div
              className="top-margin" /*Contenedor de la informacion del contenido e imagenes*/
            >
              <h1 className="big-text">Titulo</h1>
              <p>{post.dataValues.content}</p>
              <div className="flex-container">
              {post.dataValues.photo ? (
                  <img className="post-Image" src={post.dataValues.photo} alt="..." />
                ) : null}
              </div>
            </div>
            <div className="top-margin" /*Botones de mas acciones*/>
              <button className="white-text">Like</button>
              <button className="white-text horizontal-spacing">Dislike</button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h4 className="title">No hay posts creados</h4>
        </div>
      )}

      {/*-------*/}

    </div>
  );
};

export default Home;
