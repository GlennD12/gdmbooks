import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header bg-dark text-light py-3 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">GDM BOOKS</h1>
          <nav>
            <Link to="/" className="text-light mx-2">
              Home
            </Link>
            <Link to="/about" className="text-light mx-2">
              About
            </Link>
            <Link to="/contact" className="text-light mx-2">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
