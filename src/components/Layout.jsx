import React from 'react'
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Layout.css";

export function Layout(props) {
  return (
    <div className="Layout">
      <Header />
      {/* Afisam copii */}
      <main  className="flex-grow-1">{props.children}</main>
      <Footer />
    </div>
  );
  }