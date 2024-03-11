import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Container} from "react-bootstrap";
import './style.css';
import GetBooks from "../listBooks";
import Login from "../login";
import Register from "../register";
import AddNewBook from "../addBook";
import logo from '../images/logo3.webp';

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

      </nav>
      <div>
        <Container>

          <Routes>
            <Route path="/list" element={<GetBooks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-book" element={<AddNewBook />} />
             
          </Routes>
        </Container>
      </div>   
    </div>   
    </BrowserRouter>
  );
  
}


export default App;