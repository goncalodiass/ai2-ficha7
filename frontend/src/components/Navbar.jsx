import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavbarMovies = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <Navbar bg="light" expand="md" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark">
          <span className="text-dark" style={{ fontSize: "2rem" }}>Movies</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex gap-3">
            <Link
              to="/filmes/add"
              className={`btn fw-semibold px-3 rounded-pill shadow ${
                isActive("/filmes/add")
                  ? "btn-primary text-white"
                  : "btn-outline-primary border-2"
              }`}
            >
              Adicionar Filme
            </Link>
            <Link
              to="/generos"
              className={`btn fw-semibold px-4 rounded-pill shadow ${
                isActive("/generos")
                  ? "btn-secondary text-white"
                  : "btn-outline-secondary border-2"
              }`}
            >
              Generos
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMovies;
