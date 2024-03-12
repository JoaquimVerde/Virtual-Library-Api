import { useState, useEffect } from "react";
import { Container, Row, Form } from "react-bootstrap";
import logo from "../images/logo2.png";

const UpdateBook = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState();
    const [picture, setPicture] = useState("");
    const [error, setError] = useState("");
    const id = sessionStorage.getItem("id");


    const handleSubmit = () => {

        fetch(`http://5.22.217.225:8081/api/v1/book/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: title,
                description: description,
                year: year,
                book_cover: picture,
            })
        })
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

    }



    return (

        <Container>
            <div className="login">
                <img id="cloud-book" src={logo} alt="library logo"></img>

                <Row>
                    <Form className='login-form' onSubmit={handleSubmit}>
                        <Form.Label> Update Book</Form.Label>
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
                                type="text"
                                placeholder="Enter year"
                                value={year}
                                onChange={(e) => setYear(parseInt(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="picture"
                                type="text"
                                placeholder="Enter picture"
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)}
                            />
                        </Form.Group>
                        <button id="button-update-profile" onClick={handleSubmit}>Submit</button>
                    </Form>
                </Row>

            </div>
        </Container>
    );


}

export default UpdateBook;
