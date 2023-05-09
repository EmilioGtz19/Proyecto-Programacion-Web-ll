import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import '../styles/CreateCommunity.css';
import { swalAlert } from '../utils/alerts';

const apiUrl = process.env.REACT_APP_API_URL;
const apiImage = process.env.REACT_APP_API_IMAGES_URL;

function CreateCommunity(props) {

    const [selectedImage, setSelectedImage] = useState();
    const [error, setError] = useState(false);
    const [emptyImage, setEmptyImage] = useState(false);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');

    const imageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setEmptyImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (communityName.length === 0 || communityDescription.length === 0) {
            setError(true);
        }
        if (!selectedImage) {
            setEmptyImage(true);
        }

        if (communityName && communityDescription && selectedImage) {
            const responseCommunity = await createCommunity();
            const communityData = await responseCommunity.json();
            
            if(responseCommunity.ok){
     
                const responseImage = await uploadPhoto();

                if (responseImage.ok) {
                    const file = await responseImage.json();
                    
                    const responseUpdatePhoto = await updateCommunityPhoto(file.secure_url, communityData.id);

                    if(responseUpdatePhoto.ok){

                        swalAlert("Comunidad creada", "La comunidad se ha creado satisfactoriamente.", "success").then(() => {
                            window.location.href = "/";
                        });

                    }else {
                        swalAlert("Error", "Ha ocurrido un error al subir la imagen", "error")
                    }
                }

            }else{
                switch (communityData.name) {
                    case "SequelizeUniqueConstraintError":
                        swalAlert("Error", "El nombre de la comunidad ya se encuentra registrado.", "error");
                        break;
                    case "SequelizeConnectionRefusedError":
                        swalAlert("Error", "Ha ocurrido un error en el servidor.", "error");
                        break;
                    default:
                        swalAlert("Error", "Ha ocurrido un error al crear la comunidad.", "error");
                        break;
                }
            }
            
        }

    }

    async function createCommunity(){
        try {

            const response = await fetch(`${apiUrl}/api/community/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   community_name: communityName,
                   community_description: communityDescription,
                   user_id: props.user.id,
                   community_photo: null
                }),
            })

            return response;

        } catch(error){
            console.log(error);
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

    async function updateCommunityPhoto(file, id) {
        try {

            const response = await fetch(`${apiUrl}/api/community/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    community_photo: file,
                })
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="divCreateCommunity">

            <div style={{ width: 900 }} className="App bg-white p-5 rounded-5 text-success shadow-lg">

                <Form onSubmit={handleSubmit}>

                    <h1 className="mb-3">Crear comunidad</h1>

                    <div className="d-flex justify-content-center">
                        <div className=" borderPicture">
                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} className="imageDimensions" alt="User" />
                            )}
                        </div>
                    </div>
                    {emptyImage ?
                        <Form.Label className="text-danger">La imagen no puede estar vacía</Form.Label> : ""}

                    <input type="file" className="form-control mt-3" accept="image/*" onChange={imageChange} />


                    <Form.Group className="mb-3 mt-3">
                        <Form.Label className="fw-semibold">Nombre de la comunidad</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={(e) => { setCommunityName(e.target.value) }} />
                        {error && communityName.length <= 0 ?
                            <Form.Label className="text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Descripción breve</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={(e) => { setCommunityDescription(e.target.value) }} />
                        {error && communityDescription.length <= 0 ?
                            <Form.Label className="text-danger">La descripción no puede estar vacía</Form.Label> : ""}
                    </Form.Group>

                    <Button className="mt-3 shadow-sm" variant="success" type="submit">
                        Crear
                    </Button>

                </Form>

            </div>

        </div>
    );
}

export default CreateCommunity;