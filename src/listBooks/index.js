import React, { useState, useEffect } from "react";
import logo from '../images/logo4.svg';
import './style.css';
import { useNavigate } from "react-router-dom";


const GetBooks = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://5.22.217.225:8081/api/v1/book/?sort_by=year&order_by=desc")
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
  }, []);

  const deleteItem = async (itemId) => {

    try {
      await fetch(`http://5.22.217.225:8081/api/v1/book/${itemId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("token"),
        },
      });
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.log('Cannot delete Item: ', error);
    }
  };


  const updateBook = (itemId) => {
    sessionStorage.setItem("id", itemId);
    navigate("/updateBook");  
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (items.length) {
    return (
      <div>
        <div id="title">
          <h1 className="title-text">List Of Books</h1>
          <img id="circle-book" src={logo} alt="library logo"></img>
        </div>
        {items.map((item) => (
          <ul className="book-item" key={item.id}>
            <button disabled={sessionStorage.length < 1} className="button" onClick={() => deleteItem(item.id)}>delete</button>
            <img id="book_cover" src={item.book_cover} alt="book cover" />
            <li id="book-info">Id: {item.id} - Title: {item.title} - Year: {item.year} - User: {item.user.name}</li>
            <button disabled={sessionStorage.length < 1} className="button" onClick={() => updateBook(item.id)}>Update</button>
          </ul>
        ))}
      </div>
    );
  } else {
    return <p>Empty Items list</p>;
  }
}


export default GetBooks;