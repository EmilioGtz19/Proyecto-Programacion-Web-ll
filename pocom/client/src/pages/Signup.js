import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/Signup.css';

const Signup = () => { 

    const [selectedImage, setSelectedImage] = useState();
 
    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
    };
    
    return (
      <div className="divSignup">
        <div style={{width: 1000}} className="bg-white p-5 rounded-5 text-success shadow-lg text-center">

            <h1 className="mb-3">Registro</h1>

            

            <div className="d-flex justify-content-center">
            <div className=" borderPicture">
            {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} className="imageDimensions"/>
            )}
            </div>
            </div>
            
            <input type="file" className="form-control mt-3" accept="image/*" onChange={imageChange}/>

            <Form.Group className="mt-3">
                <Form.Label className="col-6 fw-semibold">Nombres</Form.Label>
                <Form.Label className="col-6 fw-semibold">Apellido Paterno</Form.Label>
            </Form.Group>

            <Form.Group className="input-group gap-3 mb-3">
                <Form.Control type="text" className="shadow-sm border border-success border-2"></Form.Control>
                <Form.Control type="text" className="shadow-sm border border-success border-2"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label className="col-6 fw-semibold">Apellido Materno</Form.Label>
                <Form.Label className="col-6 fw-semibold">Email</Form.Label>
            </Form.Group>

            <Form.Group className="input-group gap-3 mb-3">
                <Form.Control type="text" className="shadow-sm border border-success border-2"></Form.Control>
                <Form.Control type="email" className="shadow-sm border border-success border-2"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label className="col-6 fw-semibold">Contraseña</Form.Label>
                <Form.Label className="col-6 fw-semibold">Confirmar Contraseña</Form.Label>
            </Form.Group>

            <Form.Group className="input-group gap-3 mb-3">
                <Form.Control type="password" className="shadow-sm border border-success border-2"></Form.Control>
                <Form.Control type="password" className="shadow-sm border border-success border-2"></Form.Control>
            </Form.Group>

            <Button className="mt-3 shadow-sm" variant="success" type="submit">
                Registrar
            </Button>
        </div>
      </div>
    );
  }
  
export default Signup;