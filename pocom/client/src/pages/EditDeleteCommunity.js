import React from 'react'
import ReactDom from 'react-dom'
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from "react";
import { swalAlert } from "../utils/alerts";

const apiUrl = process.env.REACT_APP_API_URL;
const apiImage = process.env.REACT_APP_API_IMAGES_URL;

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    width: '900px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function Modal({ open, children, onClose, id, data }) {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [error, setError] = useState(false);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const myForm = useRef();

    useEffect(() => {
        if (data.name) {
            setCommunityName(data.name);
        }
        if (data.desc) {
            setCommunityDescription(data.desc);
        }
        if (data.photo) {
            setImageUrl(data.photo);
        }
        setError(false);

    }, [open, data]);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (myForm.current.buttonId === 'save') {
            if (communityName.length === 0 || communityDescription.length === 0) {
                setError(true);
            }

            if (communityName && communityDescription) {

                const responseUpdate = await updateCommunity();
                const communityData = await responseUpdate.json();

                if (responseUpdate.ok) {

                    if (selectedImage) {

                        const responseImage = await uploadPhoto();

                        if (responseImage.ok) {
                            const file = await responseImage.json();

                            const responseUpdatePhoto = await updateCommunityPhoto(file.secure_url);

                            if (responseUpdatePhoto.ok) {

                                swalAlert("Comunidad creada", "La comunidad se ha creado satisfactoriamente.", "success").then(() => {
                                    window.location.href = "/ManageCommunities";
                                });

                            } else {
                                swalAlert("Error", "Ha ocurrido un error al subir la imagen", "error")
                            }
                        }
                    } else {
                        swalAlert("Comunidad creada", "La comunidad se ha creado satisfactoriamente.", "success").then(() => {
                            window.location.href = "/ManageCommunities";
                        });
                    }

                } else {
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



                onClose(true);

            }
        }

        if (myForm.current.buttonId === 'delete') {

            const responseDelete = await deleteCommunity()
            const deleteData = await responseDelete.json();

            if (responseDelete.ok) {

                swalAlert("Comunidad eliminada", "La comunidad se ha eliminado satisfactoriamente.", "success").then(() => {
                    window.location.href = "/ManageCommunities";
                });

            } else {
                switch (deleteData.name) {
                    case "SequelizeConnectionRefusedError":
                        swalAlert("Error", "Ha ocurrido un error en el servidor.", "error");
                        break;
                    default:
                        swalAlert("Error", "Ha ocurrido un error al eliminar la comunidad.", "error");
                        break;
                }
            }

            onClose(true);
            setCommunityName('');
            setCommunityDescription('');
            setError(false);
        }

    }

    function closeModal() {
        onClose(true);
    }

    async function updateCommunity() {
        try {
            const response = await fetch(`${apiUrl}/api/community/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    community_name: communityName,
                    community_description: communityDescription,
                })
            })

            return response;

        } catch (error) {
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

    async function updateCommunityPhoto(file) {
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

    async function deleteCommunity() {
        try {

            const response = await fetch(`${apiUrl}/api/community/logicalDelete/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })

            return response;

        } catch (error) {
            console.log(error)
        }
    }


    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div className='rounded p-4 text-success' style={MODAL_STYLES}>
                <Form onSubmit={handleSubmit} ref={myForm}>

                    <div className='d-flex justify-content-end'>
                        <button onClick={closeModal} className="btn-close"></button>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <h1 className="mb-2">Editar comunidad</h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className=" borderPicture">
                            {imageUrl && (
                                <img src={imageUrl} className="imageDimensions" alt="User" />
                            )}
                        </div>
                    </div>

                    <input type="file" className="form-control mt-2" accept="image/*" onChange={imageChange} />


                    <Form.Group className="mb-2 mt-2">
                        <Form.Label className="fw-semibold">Nombre de la comunidad</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={(e) => { setCommunityName(e.target.value) }} value={communityName} />
                        {error && communityName.length <= 0 ?
                            <Form.Label className="text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label className="fw-semibold">Descripción breve</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={(e) => { setCommunityDescription(e.target.value) }} value={communityDescription} />
                        {error && communityDescription.length <= 0 ?
                            <Form.Label className="text-danger">La descripción no puede estar vacía</Form.Label> : ""}
                    </Form.Group>

                    <div className='d-flex justify-content-center gap-5'>
                        <Button id='save' onClick={e => myForm.current.buttonId = e.target.id} className="mt-2 shadow-sm" variant="success" type="submit" value={'guardar'}>
                            Guardar cambios
                        </Button>
                        <Button id='delete' onClick={e => myForm.current.buttonId = e.target.id} className="mt-2 shadow-sm" variant="danger" type="submit" value={'eliminar'}>
                            Eliminar comunidad
                        </Button>
                    </div>

                </Form>
            </div>
        </>,
        document.getElementById('portal')
    )
} 