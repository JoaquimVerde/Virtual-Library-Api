import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";





const AddNewBook = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate();


    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const route = "http://5.22.217.225:8081/api/v1/book/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: title,
                description: description,
                year: year,
            }),
        };

        fetch(route, options)
        .then((response) => {
            console.log(response);
            if (response.status !== 200) {
            throw new Error("something went wrong");
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
            setError("something went wrong:", error);
        });
        navigate("/list");
        
    };

    return (
        <Container>
            <div className="login">
                <img id="cloud-book" src={logo} alt="library logo"></img>
                <Row>
                    <Form className='login-form' onSubmit={handleSubmit}>
                        <Form.Label> New Book</Form.Label>
                        <Form.Group>
                            <Form.Control
                                id="title"
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="description"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="year"
                                type="number"
                                placeholder="Enter year"
                                value={year}
                                onChange={(e) => setYear(parseInt(e.target.value))}
                            />
                        </Form.Group>
                        <button onClick={handleSubmit}>Submit</button>                                                
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

export default AddNewBook;