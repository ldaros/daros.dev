import { FC, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

interface NavLinkProps {
  to: string;
  children: string;
}

export const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const handleClick = (event: SyntheticEvent) => {
    const isHash = to.startsWith("#");
    if (isHash) {
      event.preventDefault();
      scrollToHash(to);
    }
  };

  return ( 
    <Link to={to} className="navigation__link" onClick={handleClick}>
      {children}
    </Link>
  );
};

function scrollToHash(to: string) {
  const targetElement = document.querySelector(to);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}
