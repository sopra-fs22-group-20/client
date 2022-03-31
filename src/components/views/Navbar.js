import React from 'react'
import { render } from 'react-dom'


class Navbar extends React.Component{
    render() {
        return (
            <div>
                <ul id="nav">
                    <li><a href="/game">Home</a></li>
                    <li><a href="/pictures">Pictures</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/highlights">Highlights</a></li>
                </ul>
            </div>
        );
    }
}
export default Navbar;