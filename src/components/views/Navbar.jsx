import React from 'react';
import 'styles/ui/Navbar.scss';

function Navbar() {
  return (
    <div>
      <ul id="nav">
        <li><a href="/highlights">Highlights</a></li>
        <li><a href="/ProfilePage">Profile Page</a></li>
        <li><a href="/pictures">Pictures</a></li>
        <li><a href="/home">Home</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
