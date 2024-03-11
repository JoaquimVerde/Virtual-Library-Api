import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import logo from "../images/logo2.png"

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const route = "http://5.22.217.225:8081/api/v1/auth/register";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
                name: name,
            }),
        };

        fetch(route, options)
        .then((response) => {
            if (response.status !== 201) {
            throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then((jsonData) => {
            setToken(jsonData.data.token);
            sessionStorage.setItem('token', jsonData.data.token);
            setError("");
        })
        .catch((error) => {
            console.error(error);
            setToken("");
            setError("something went wrong");
        });
    };

    return (
        <Container>
            <div className="login">
            <img id="cloud-book" src={logo} alt="library logo"></img>
                <Row>
                    <Form className='login-form' onSubmit={handleSubmit}>
                        <Form.Label> Register:</Form.Label>
                        <Form.Group>
                            <Form.Control
                                id="username"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="name"
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </Form>
                </Row>
                {error.length > 0 && (
                    <Row>
                        <Col>{error !== "" ? <p> {error} </p> : null}</Col>
                    </Row>
                )}
            </div>
        </Container>
    );

    
    
}

export default Register;