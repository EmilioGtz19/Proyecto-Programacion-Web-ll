import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Profile.css";
import Modal from "./Modal";
import { swalAlert } from "../utils/alerts";
import NavBar from "../pages/NavBar.js";

const apiUrl = process.env.REACT_APP_API_URL;
const apiImage = process.env.REACT_APP_API_IMAGES_URL;

const Profile = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [firstName, setFirstName] = useState("");
  const [fatherLastName, setFatherLastName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          `${apiUrl}/api/user/getUser/${props.user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setFirstName(data.user.first_name);
        setFatherLastName(data.user.last_name);
        setMotherLastName(data.user.mother_last_name);
        setImageUrl(data.user.user_photo);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [props.user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName.length === 0 ||
      fatherLastName.length === 0 ||
      motherLastName.length === 0
    ) {
      setError(true);
    }

    // nota: no valido la imagen vacía porque como es modificar usuario ya debería de tener una
    if (firstName && fatherLastName && motherLastName) {
      const responseUpdate = await updateUser();

      if (selectedImage) {
        const responseImage = await uploadPhoto();
        if (responseImage.ok) {
          const file = await responseImage.json();
          await updateUserPhoto(file.secure_url);
        }
      }

      if (responseUpdate.ok) {
        swalAlert(
          "Usuario actualizado",
          "El usuario se ha actualizado satisfactoriamente.",
          "success"
        );
      } else {
        swalAlert(
          "Error",
          "Ha ocurrido un error al actualizar el usuario",
          "error"
        );
      }
    }
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  async function updateUser() {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/update/${props.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: fatherLastName,
            mother_last_name: motherLastName,
          }),
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadPhoto() {
    try {
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "vy7khmyb");

      const response = await fetch(`${apiImage}/image/upload`, {
        method: "POST",
        body: data,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserPhoto(file) {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/update/${props.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_photo: file,
          }),
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="divProfile">
        <div
          style={{ width: 550 }}
          className="App bg-white p-5 rounded-5 text-success shadow-lg"
        >
          <Form onSubmit={handleSubmit}>
            <h1 className="mb-3">Actualizar Perfil</h1>

            <div className="d-flex justify-content-center">
              <div className=" borderPicture">
                {imageUrl && (
                  <img src={imageUrl} className="imageDimensions" alt="User" />
                )}
              </div>
            </div>
            <input
              type="file"
              className="form-control mt-3"
              accept="image/*"
              onChange={imageChange}
            />

            <Form.Group className="mb-3 mt-3">
              <Form.Label className="fw-semibold">Nombre</Form.Label>
              <Form.Control
                className="shadow-sm border border-success border-2"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              {error && firstName.length <= 0 ? (
                <Form.Label className="col-6 text-danger">
                  El nombre no puede estar vacío
                </Form.Label>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Apellido Paterno</Form.Label>
              <Form.Control
                className="shadow-sm border border-success border-2"
                type="text"
                onChange={(e) => setFatherLastName(e.target.value)}
                value={fatherLastName}
              />
              {error && fatherLastName.length <= 0 ? (
                <Form.Label className="col-6 text-danger">
                  El nombre no puede estar vacío
                </Form.Label>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Apellido Materno</Form.Label>
              <Form.Control
                className="shadow-sm border border-success border-2"
                type="text"
                onChange={(e) => setMotherLastName(e.target.value)}
                value={motherLastName}
              />
              {error && motherLastName.length <= 0 ? (
                <Form.Label className="col-6 text-danger">
                  El nombre no puede estar vacío
                </Form.Label>
              ) : (
                ""
              )}
            </Form.Group>

            <div className=" d-flex justify-content-center gap-5">
              <Button className="mt-3 shadow-sm" variant="success" href="/home">
                Cancelar
              </Button>
              <Button
                className="mt-3 shadow-sm"
                variant="success"
                type="submit"
              >
                Guardar
              </Button>
              <Button
                onClick={() => setIsOpen(true)}
                className="mt-3 shadow-sm"
                variant="primary"
              >
                Cambiar contraseña
              </Button>
              <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                id={props.user.id}
              ></Modal>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
