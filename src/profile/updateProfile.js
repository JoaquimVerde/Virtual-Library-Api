import { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";




const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();




    const handleSubmit = () => {

        fetch("http://5.22.217.225:8081/api/v1/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
                email: email,
                profile_picture: picture,
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
            navigate("/profile");

    }



    return (

        <Container>
            <div className="login">
            <img id="cloud-book" src={logo} alt="library logo"></img>

                <Row>
                    <Form className='login-form' onSubmit={handleSubmit}>
                        <Form.Label> Update Profile</Form.Label>
                        <Form.Group>
                            <Form.Control
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="email"
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                id="picture"
                                type="text"
                                placeholder="Enter url"
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

export default UpdateProfile;