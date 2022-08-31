import { Link, useMatch, useResolvedPath } from "react-router-dom"
import logo from './img/logo/facebook_cover_photo_1.png'

export default function Navbar() {
  return (
    <nav className="nav">
        <a href="/" className="site-title">
          <img src={logo} alt={"logo"} height={75}></img>
        </a>
        <ul>
            <li>
              <a href="/Login">Login</a>
            </li>
            <li>
              <a href="/Register">Register</a>
            </li>
            <li>
              <a href="/home">About</a>
            </li>
        </ul>
    </nav>
  )
}
