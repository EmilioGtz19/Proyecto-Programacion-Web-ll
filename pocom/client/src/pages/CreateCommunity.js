import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import '../styles/CreateCommunity.css';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (communityName.length === 0 || communityDescription.length === 0) {
            setError(true);
        }
        if (!selectedImage) {
            setEmptyImage(true);
        }

        if (communityName && communityDescription && selectedImage) {
            alert("todo correcto")
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