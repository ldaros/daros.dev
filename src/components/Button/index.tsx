import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

interface ButtonProps {
  icon?: ReactElement;
  to: string;
  text: string;
}

export const Button: FC<ButtonProps> = ({ to, text, icon }) => (
  <Link to={to} className="button">
    {icon && <div className="button__icon">{icon}</div>}

    <div className="button__text">{text}</div>
  </Link>
);
