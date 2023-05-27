import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";

const Post = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/posts/getPostsByCommunityId/${props.community_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostsData(data);
      });
  }, [apiUrl, props.community_id]);

  const LikeonClick = (id) => {
    let Like = document.getElementById("Like-" + id);
    let DisLike = document.getElementById("DisLike-" + id);

    console.log("Like en post id:", id);

    if (Like.classList.contains("invertbtn")) {
      Like.classList.remove("invertbtn");
    } else {
      Like.classList.add("invertbtn");
      if (DisLike.classList.contains("invertbtn")) {
        DisLike.classList.remove("invertbtn");
      }
    }
  };

  const DislikeonClick = (id) => {
    let Like = document.getElementById("Like-" + id);
    let DisLike = document.getElementById("DisLike-" + id);

    console.log("DisLike en post id:", id);

    if (DisLike.classList.contains("invertbtn")) {
      DisLike.classList.remove("invertbtn");
    } else {
      DisLike.classList.add("invertbtn");
      if (Like.classList.contains("invertbtn")) {
        Like.classList.remove("invertbtn");
      }
    }
  };

  return (
    <div className="flex-container flex-column post-container white-text no-top-padding">
      {postsData.length > 0 ? (
        postsData.map((post) => (
          <div
            /*Contenedor del contenido*/
            key={post.id}
          >
            {/* community */}
            <div
              className="flex-container flex-content-start top-margin"
              /*Contenedor de la informacion de la comunidad*/
            >
              <img
                className="post-Userimg "
                /*Imagen de la comunidad*/ src={post.FK_post_user.user_photo}
                alt="..."
                /*alt="Imagen de la comunidad"*/
              ></img>
              <p className="flex-container flex-column horizontal-spacing bold-text">
                {post.FK_post_community.community_name}
              </p>
              <p className="flex-container flex-column horizontal-spacing">
                {post.FK_post_user.first_name}
              </p>
              <p className="flex-container flex-column horizontal-spacing-r small-text">
                {post.createdAt}
              </p>
            </div>

            <div
              className="top-margin" /*Contenedor de la informacion del contenido e imagenes*/
            >
              <h1 className="big-text">{post.title}</h1>
              <p>{post.content}</p>
              <div className="flex-container">
                {post.photo ? (
                  <img className="post-Image" src={post.photo} alt="..." />
                ) : null}
              </div>
            </div>
            <div className="top-margin" /*Botones de mas acciones*/>
              <button
                id={"Like-" + post.id}
                className="white-text"
                onClick={() => LikeonClick(post.id)}
              >
                Like
              </button>
              <button
                id={"DisLike-" + post.id}
                className="white-text horizontal-spacing"
                onClick={() => DislikeonClick(post.id)}
              >
                Dislike
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h4 className="title">No hay posts creados</h4>
        </div>
      )}
    </div>
  );
};

export default Post;
