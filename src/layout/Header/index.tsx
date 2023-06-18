import { FC } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "~/components";

import "./styles.scss";

export const Header: FC = () => (
  <header className="header">
    <Link to="/" className="header__logo">
      daros.dev
    </Link>

    <nav className="header__navigation">
      <NavLink to="#featured">featured</NavLink>
      <NavLink to="#projects">projects</NavLink>
      <NavLink to="#contact">contact</NavLink>
    </nav>
  </header>
);
