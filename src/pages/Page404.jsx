import React from "react";
import "./Page404.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div className="Page404 bg-secondary text-white d-flex flex-column justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <p className="h4 text-center">
          No movies found...
        </p>
        <strong className="error404">404 :(</strong>
        <p className="h4 text-center">
          <Link to="/" className="text-white">
            Come back to Home Page!
          </Link>
        </p>
      </Container>
    </div>
  );
}


