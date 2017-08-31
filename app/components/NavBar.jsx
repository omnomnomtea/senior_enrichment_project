import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Link to="/campuses">
          <button className="col-xs-12 col-sm-12 col-md-12">Campuses</button>
        </Link>
      </div>
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Link to="/students">
          <button className="col-xs-12 col-sm-12 col-md-12">Students</button>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar;
