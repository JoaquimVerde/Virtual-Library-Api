import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import './style.css';
import GetBooks from "../listBooks";
import Login from "../login";
import Register from "../register";
import AddNewBook from "../addBook";
import logo from '../images/logo3.webp';
import GetProfile from "../profile";
import UpdateProfile from "../profile/updateProfile";
import UpdateBook from "../listBooks/updateBook";

function App() {

  return (

    <BrowserRouter>

      <div>
        <h1 id='header'>Book Virtual Library</h1>
        <img id="App-logo" src={logo} alt="library logo"></img>
        <nav className='nav-bar'>
          <Link className='nav-link' to="/list">Books</Link>
          <Link className='nav-link' to="/login">Login</Link>
          <Link className='nav-link' to="/register">Register</Link>
          <Link className='nav-link' to="/add-book">Add Book</Link>
          <Link className='nav-link' to="/profile">Profile</Link>


        </nav>
        <div>
          <Container>

            <Routes>
              <Route path="/list" element={<GetBooks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-book" element={<AddNewBook />} />
              <Route path="/profile" element={<GetProfile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
              <Route path="/updateBook" element={<UpdateBook />} />




            </Routes>
          </Container>
        </div>
      </div>
    </BrowserRouter>
  );

}


export default App;
