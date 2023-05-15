import React from 'react'
import ReactDom from 'react-dom'
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { swalAlert } from '../utils/alerts';
import Button from 'react-bootstrap/Button';
import { useRef } from "react";

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

export default function Modal({ open, children, onClose }) {
    const [selectedImage, setSelectedImage] = useState();
    const [error, setError] = useState(false);
    const [emptyImage, setEmptyImage] = useState(false);
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    //const [typeSubmit, setTypeSubmit] = useState('');

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setEmptyImage(false);
        }
    };

    const myForm = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(myForm.current.buttonId);

        if(myForm.current.buttonId === 'save'){
            if (communityName.length === 0 || communityDescription.length === 0) {
                setError(true);
            }
    
            if (communityName && communityDescription) {
                alert('se actualiza');
                onClose(true);
    
                setCommunityName('');
                setCommunityDescription('');
                setError(false);
            }
        }
        
        if(myForm.current.buttonId === 'delete'){

            alert('se elimina');
            onClose(true);
    
            setCommunityName('');
            setCommunityDescription('');
            setError(false);
        }
    }

    function closeModal(){
        onClose(true);
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
                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} className="imageDimensions" alt="User" />
                            )}
                        </div>
                    </div>
                    {emptyImage ?
                        <Form.Label className="text-danger">La imagen no puede estar vacía</Form.Label> : ""}

                    <input type="file" className="form-control mt-2" accept="image/*" onChange={imageChange} />


                    <Form.Group className="mb-2 mt-2">
                        <Form.Label className="fw-semibold">Nombre de la comunidad</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={(e) => { setCommunityName(e.target.value) }} />
                        {error && communityName.length <= 0 ?
                            <Form.Label className="text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label className="fw-semibold">Descripción breve</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={(e) => { setCommunityDescription(e.target.value) }} />
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