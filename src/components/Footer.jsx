import React from 'react';
import Container from 'react-bootstrap/Container';

 export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark">
      <Container>
        <p className="text-light text-center mt-1 py-3">
          Movie App © {year}. All the rights are reserved.
        </p>
      </Container>
    </footer>
  );
}

