import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/Profile.css';

const Profile = () => {

    const [selectedImage, setSelectedImage] = useState();
    const [firstName, setFirstName] = useState('');
    const [fatherLastName, setFatherLastName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [samePasswords, setSamePasswords] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/user/getSession', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (!data.loggedIn) {
                    window.location.href = '/home';
                }
            })
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName.length === 0 || fatherLastName.length === 0
            || motherLastName.length === 0 || password.length === 0
            || confirmPassword.length === 0) {
            setError(true);
        }
        if (password !== confirmPassword) {
            setSamePasswords(false);
        }
        else {
            setSamePasswords(true);
        }

        // nota: no valido la imagen vacía porque como es modificar usuario ya debería de tener una
        if (firstName && fatherLastName && motherLastName
            && password && confirmPassword
            && (password === confirmPassword)) {
            alert('Todo correcto')
        }
    }

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="divProfile">

            <div style={{ width: 550 }} className="App bg-white p-5 rounded-5 text-success shadow-lg">

                <Form onSubmit={handleSubmit}>

                    <h1 className="mb-3">Actualizar Perfil</h1>

                    <div className="d-flex justify-content-center">
                        <div className=" borderPicture">
                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} className="imageDimensions" alt="User" />
                            )}
                        </div>
                    </div>

                    <input type="file" className="form-control mt-3" accept="image/*" onChange={imageChange} />

                    <Form.Group className="mb-3 mt-3">
                        <Form.Label className="fw-semibold">Nombre</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={e => setFirstName(e.target.value)} />
                        {error && firstName.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Apellido Paterno</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={e => setFatherLastName(e.target.value)} />
                        {error && fatherLastName.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Apellido Materno</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="text" onChange={e => setMotherLastName(e.target.value)} />
                        {error && motherLastName.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Contraseña</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="password" onChange={e => setPassword(e.target.value)} />
                        {error && password.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
                        <Form.Control className="shadow-sm border border-success border-2" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                        {error && confirmPassword.length <= 0 ?
                            <Form.Label className="col-6 text-danger">El nombre no puede estar vacío</Form.Label> : ""}
                        {!samePasswords ?
                            <Form.Label className="col-12 text-danger">Las contraseñas deben ser iguales</Form.Label> : ""}
                    </Form.Group>

                    <Button className="mt-3 shadow-sm" variant="success" type="submit">
                        Guardar
                    </Button>

                </Form>

            </div>

        </div>
    );

}

export default Profile;