import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/campuses"><button>Home</button></Link>
      <Link to="/students"><button>Students</button></Link>
    </nav>
  )
}

export default NavBar;
