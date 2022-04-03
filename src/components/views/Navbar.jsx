import React from 'react';
import 'styles/ui/Navbar.scss';

function Navbar() {
  return (
    <div>
      <ul id="nav">
        <li><a href="/highlights">Highlights</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/pictures">Pictures</a></li>
        <li><a href="/game">Home</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
