import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import MoviesList from './view/MoviesList';
import MoviesAdd from './view/MoviesAdd';
import MoviesEdit from './view/MoviesEdit';
import Generos from './view/Generos';
import GenerosEdit from "./view/GenerosEdit";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <span className="text-danger">Movies</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex gap-2">
                <Button as={Link} to="/filmes/add" variant="success">
                  Add Movie
                </Button>
                <Button as={Link} to="/generos" variant="success">
                  Generos
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/filmes/add" element={<MoviesAdd />} />
              <Route path="/filmes/edit/:moviesId" element={<MoviesEdit />} />
              <Route path="/generos" element={<Generos />} />
              <Route path="/generos/edit/:id" element={<GenerosEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router >
  );
};
export default App;
