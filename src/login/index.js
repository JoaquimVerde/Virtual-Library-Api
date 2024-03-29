import logo from "../images/logo2.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import React, { useState } from "react";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");


    const refreshPage = () => {
        window.location.reload(false);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const route = "http://5.22.217.225:8081/api/v1/auth/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        };

        fetch(route, options)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("incorrect login");
                }
                return response.json();
            })
            .then((jsonData) => {
                setToken(jsonData.data.token);
                sessionStorage.setItem('token', jsonData.data.token);
                refreshPage();
                setError("");
            })
            .catch((error) => {
                console.error(error);
                setToken("");
                setError("incorrect login");
            });
            
    };





    return (
        <Container>
            <div className="login">
                <img id="cloud-book" src={logo} alt="library logo"></img>
                <Row>
                    <Form className='login-form' onSubmit={handleSubmit}>
                        <Form.Label> Login:</Form.Label>
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

export default Login;