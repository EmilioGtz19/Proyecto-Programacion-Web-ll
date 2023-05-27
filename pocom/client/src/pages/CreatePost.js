import React from "react";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Flexbox.css";
import "../styles/Posts.css";
import { swalAlert } from "../utils/alerts";

const CreatePost = (props) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const apiImage = process.env.REACT_APP_API_IMAGES_URL;

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const imageRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0) {
      swalAlert("Error", "Llenar al menos titulo y contenido", "error");
      return;
    }

    const responseCreate = await createPost();
    const data = await responseCreate.json();

    if (responseCreate.ok) {

      if (selectedImage) {
        const responseImage = await uploadPhoto();
        if (responseImage.ok) {
          const file = await responseImage.json();
          await updatePostPhoto(file.secure_url, data.id);
        }
      }

      swalAlert("Post creado", "El post se ha creado con exito", "success");

      titleRef.current.value = ''
      contentRef.current.value = ''
      imageRef.current.value = null

    } else {
      swalAlert("Error", "Ha ocurrido un error al crear el post", "error");
    }

  }

  async function createPost() {
    try {

      const response = await fetch(`${apiUrl}/api/posts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
          community_id: props.community_id,
          user_id: props.user_id
        }),
      })

      return response;

    } catch (error) {
      console.log(error.message)
    }
  }

  async function uploadPhoto() {
    try {

      const data = new FormData();
      data.append("file", selectedImage)
      data.append("upload_preset", "vy7khmyb")

      const response = await fetch(`${apiImage}/image/upload`, {
        method: "POST",
        body: data,
      })

      return response;

    } catch (error) {
      console.log(error);
    }
  }

  async function updatePostPhoto(file, id) {
    try {

      const response = await fetch(`${apiUrl}/api/posts/updatePosts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photo: file,
        })
      });

      return response;

    } catch (error) {
      console.log(error);
    }
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

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


      <Form onSubmit={handleSubmit}>
        <div
          id="PublishCtrl"
          className="top-margin flex-container flex-item-center" /*Contenedor de la informacion del contenido e imagenes*/
          style={{ display: `none` }}
        >
          <div
            id="CreadorDePosts"
            className="flex-container flex-column full-width"
          >
            <Form.Control type="text" placeholder="Titulo del Post" ref={titleRef} onChange={e => setTitle(e.target.value)}></Form.Control>
            <Form.Control type="text" placeholder="Contenido del Post" ref={contentRef} onChange={e => setContent(e.target.value)}></Form.Control>
            <div
              id="CreadorDePosts"
              className="flex-container flex-content-space-bt full-width"
            >
              <input type="file" ref={imageRef} className="form-control mt-3" accept="image/*" onChange={imageChange} />
              <button className="white-text" type="submit"> publish</button>
            </div>
          </div>
        </div>
      </Form>

    </div>
  );
};

function PublishPost() {
  let Publish = document.getElementById("Publish");
  let PublishCtrl = document.getElementById("PublishCtrl");
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
