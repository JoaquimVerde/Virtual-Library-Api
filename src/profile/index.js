import React, { useState, useEffect } from "react";
import logo from "../images/logo4.svg";
import { useNavigate } from "react-router-dom";



const GetProfile = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!sessionStorage.getItem("token")){
            navigate("/login");
        }
    })


    useEffect(() => {
        fetch("http://5.22.217.225:8081/api/v1/user/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            }
            );
    },
        []);


        const updateProfile = () => {
            navigate("/updateProfile");
        }



    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="update-div">
                <div id="title">
                    <h1 className="title-text">Your Profile</h1>
                    <img id="circle-book" src={logo} alt="library logo"></img>
                </div>

                <ul className="book-item" key={items.id}>
                    <img id="profile-image" src={items.profile_picture} alt="book cover" />
                    <div id="profile-info">
                        <li>Id: {items.id}</li>
                        <li>Name: {items.name}</li>
                        <li>Email: {items.email}</li>
                        <button id="button-update-profile" onClick={updateProfile}>Update Profile</button>
                    </div>
                    

                </ul>



            </div>
        );
    }
};




export default GetProfile;