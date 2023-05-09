import React from 'react'
import ReactDom from 'react-dom'
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { swalAlert } from '../utils/alerts';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
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

export default function Modal({ open, children, onClose, id }) {
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setPassword('');
        setConfirmPassword('');
        setError(false);
      }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length === 0 || confirmPassword.length === 0) {
            setError(true);
        }else{
            setError(false);
            const responseUpdate = await updatePass();
            if(responseUpdate.ok){
                swalAlert("Contraseña actualizada", "La contraseña se ha actualizado satisfactoriamente.", "success").then(() => {
                    onClose();
                });
            }else{
                const error = await responseUpdate.json();
                
                if(error.message === "Passwords do not match"){
                    swalAlert("Contraseña no actualizada", "Tu contraseña actual no coincide", "error")
                }  else{
                    swalAlert("Contraseña no actualizada", "Ha ocurrido un error", "error")
                }
                
            }  
        }

    }

    async function updatePass() {
        try {

            const response = await fetch(`${apiUrl}/api/user/updatePass/${id}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    old_pass: password,
                    new_pass: confirmPassword
                })
            })

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div className='rounded p-5' style={MODAL_STYLES}>
                <Form.Group className="mb-3" style={{ width: 500 }}>
                    <Form.Label className="fw-semibold">Contraseña actual</Form.Label>
                    <Form.Control className="shadow-sm border border-success border-2 w-100" type="password" onChange={e => setPassword(e.target.value)} />
                    {error && password.length <= 0 ?
                        <Form.Label className="text-danger">La contraseña no puede estar vacía</Form.Label> : ""}
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: 500 }}>
                    <Form.Label className="fw-semibold">Nueva Contraseña</Form.Label>
                    <Form.Control className="shadow-sm border border-success border-2 w-100" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    {error && confirmPassword.length <= 0 ?
                        <Form.Label className="text-danger">El confirmar contraseña no puede estar vacío</Form.Label> : ""}
                </Form.Group>

                <div className='d-flex gap-5 justify-content-center'>
                    <button className='btn btn-danger' onClick={onClose}>Cerrar</button>
                    <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
} 