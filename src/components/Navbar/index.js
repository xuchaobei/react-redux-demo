import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  return (
    <nav className="navBar">
      <section>
        <h1>React + React Router + Redux Example</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
          </div>
          <div className="navLinks">
            <Link to="/editor">Editor</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
