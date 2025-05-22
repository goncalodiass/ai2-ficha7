import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
return (
     <footer className="bg-light border-top shadow-sm py-4 mt-5">
        <Container className="text-center text-muted">
                By <strong><a href="https://github.com/goncalodiass" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Gonçalo Dias</a></strong>.
        </Container>
    </footer>
  );
};

export default Footer;
