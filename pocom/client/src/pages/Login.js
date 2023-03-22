import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: pass }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    };
  
    return (
  
      <div className="divLogin">
  
      <div style={{width: 450}} className="App bg-white p-5 rounded-5 text-success shadow-lg">
  
        <Form onSubmit={handleSubmit}>
  
          <h1 className="mb-3">Iniciar sesión</h1>
  
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label className="fw-semibold">Email</Form.Label>
          <Form.Control className="shadow-sm border border-success border-2" type="email" placeholder="Ingresa tu correo" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-semibold">Contraseña</Form.Label>
          <Form.Control className="shadow-sm border border-success border-2" type="password" placeholder="Contraseña" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        </Form.Group>
        
        <Button className="mt-3 shadow-sm" variant="success" type="submit">
          Ingresar
        </Button>
        
      </Form>
  
      </div>
  
      </div>
    );
  }
  
  export default Login;