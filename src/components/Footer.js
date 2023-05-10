import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="page-footer bg-secondary container-fluid">
        <div className="page-footer__copyright">
          <p className="mb-2 mt-2">
           <Link to="/" title="soccerStats">SoccerSTATS.com</Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
