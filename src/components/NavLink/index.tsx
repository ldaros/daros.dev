import { FC } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

interface NavLinkProps {
  to: string;
  children: string;
}

export const NavLink: FC<NavLinkProps> = ({ to, children }) => (
  <Link to={to} className="navigation__link">
    {children}
  </Link>
);
