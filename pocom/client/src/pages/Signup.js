import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { swalAlert } from "../utils/alerts";
import '../styles/Signup.css';

const Signup = () => {

    const [selectedImage, setSelectedImage] = useState();
    const [firstName, setFirstName] = useState('');
    const [fatherLastName, setFatherLastName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [emptyImage, setEmptyImage] = useState(false);

    // This function will be triggered when the file field change
    const imageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setEmptyImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstName.length === 0 || fatherLastName.length === 0
            || motherLastName.length === 0 || email.length === 0
            || password.length === 0 || confirmPassword.length === 0) {
            setError(true);
        }
        if (!selectedImage) {
            setEmptyImage(true);
        }

        if (firstName && fatherLastName && motherLastName
            && email && password && confirmPassword
            && selectedImage) {

            try {

                const data = new FormData();
                data.append("file", selectedImage)
                data.append("upload_preset", "vy7khmyb")

                const responseImage = await fetch("https://api.cloudinary.com/v1_1/dbghuik1d/image/upload", {
                    method: "POST",
                    body: data,
                })

                const file = await responseImage.json();

                const response = await fetch("http://localhost:3001/api/user/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: fatherLastName,
                        mother_last_name: motherLastName,
                        email: email,
                        password: password,
                        user_photo: file.secure_url,
                        status: 1,
                        user_type_id: 1
                    }),
                })

                if (response.ok) {
                    swalAlert("Usuario creado", "El usuario se ha creado satisfactoriamente.", "success")
                        .then(() => {
                            window.location.href = "/login";
                        });
                } else {
                    const data = await response.json();
                    switch (data.name) {
                        case "SequelizeUniqueConstraintError":
                            swalAlert("Error", "El correo ya se encuentra registrado.", "error");
                            break;
                        case "SequelizeConnectionRefusedError":
                            swalAlert("Error", "Ha ocurrido un error en el servidor.", "error");
                            break;
                        default:
                            swalAlert("Error", "Ha ocurrido un error al crear el usuario.", "error");
                            break;
                    }
                }

            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <Form className="divSignup" onSubmit={handleSubmit}>
            <div style={{ width: 1000 }} className="bg-white p-5 rounded-5 text-success shadow-lg text-center">

                <h1 className="mb-3">Registro</h1>

                <div className="d-flex justify-content-center">
                    <div className=" borderPicture">
                        {selectedImage && (
                            <img src={URL.createObjectURL(selectedImage)} className="imageDimensions" alt="User"/>
                        )}
                    </div>
                </div>
                {emptyImage ?
                    <Form.Label className="text-danger">La imagen no puede estar vacía</Form.Label> : ""}

                <input type="file" className="form-control mt-3" accept="image/*" onChange={imageChange} />

                <div>
                    <Form.Group>
                        <Form.Label className="col-6 fw-semibold">Nombres</Form.Label>
                        <Form.Label className="col-6 fw-semibold">Apellido Paterno</Form.Label>
                    </Form.Group>
                    <Form.Group className="input-group gap-3">
                        <Form.Control type="text" className="shadow-sm border border-success border-2" onChange={e => setFirstName(e.target.value)}></Form.Control>
                        <Form.Control type="text" className="shadow-sm border border-success border-2" onChange={e => setFatherLastName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        {error && firstName.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                        {error && fatherLastName.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El apellido paterno no puede estar vacío</Form.Label> : ""}
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label className="col-6 fw-semibold">Apellido Materno</Form.Label>
                        <Form.Label className="col-6 fw-semibold">Email</Form.Label>
                    </Form.Group>
                    <Form.Group className="input-group gap-3">
                        <Form.Control type="text" className="shadow-sm border border-success border-2" onChange={e => setMotherLastName(e.target.value)}></Form.Control>
                        <Form.Control type="email" className="shadow-sm border border-success border-2" onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        {error && motherLastName.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El apellido materno no puede estar vacío</Form.Label> : ""}
                        {error && email.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El correo electrónico no puede estar vacío</Form.Label> : ""}
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label className="col-6 fw-semibold">Contraseña</Form.Label>
                        <Form.Label className="col-6 fw-semibold">Confirmar Contraseña</Form.Label>
                    </Form.Group>
                    <Form.Group className="input-group gap-3">
                        <Form.Control type="password" className="shadow-sm border border-success border-2" onChange={e => setPassword(e.target.value)}></Form.Control>
                        <Form.Control type="password" className="shadow-sm border border-success border-2" onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        {error && password.length <= 0 ?
                            <Form.Label className="col-6 text-danger">La contraseña no puede estar vacía</Form.Label> : ""}
                        {error && confirmPassword.length <= 0 ?
                            <Form.Label className="col-6 text-danger">La contraseña confirmada no puede estar vacía</Form.Label> : ""}
                    </Form.Group>
                </div>

                <Button className="mt-3 shadow-sm" variant="success" type="submit">
                    Registrar
                </Button>
            </div>
        </Form>
    );
}

export default Signup;