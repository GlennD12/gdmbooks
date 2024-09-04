import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5>GDM BOOKS</h5>
            <p>&copy; 2024 GDM Books. All rights reserved.</p>
          </div>
        </div>
        <div className="mt-3">
          <Link to="/privacy-policy" className="text-light mx-2">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-light mx-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;