import React from 'react';
import { Link } from 'react-router';

function NavBar() {
  return (
    <nav>
      <Link to="/"><button>Home</button></Link>
      <Link to="/students"><button>Students</button></Link>
    </nav>
  )

}
export default NavBar;
