import Logo from "./Logo";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="App-header">
      <Logo />
      <nav className="nav">
        <ul className="navList">
          <li className="navItem">
            <Link
              to="/"
              className={`navLink ${
                window.location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/about-us"
              className={`navLink ${
                window.location.pathname === "/about-us" ? "active" : ""
              }`}
            >
              About Us
            </Link>
          </li>
          <li className="navItem">
            <Link
              to="/contact"
              className={`navLink ${
                window.location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
