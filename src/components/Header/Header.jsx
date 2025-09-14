import css from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className={css.logo}></Link>

      <nav className={css.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? css.active : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) => (isActive ? css.active : undefined)}
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
