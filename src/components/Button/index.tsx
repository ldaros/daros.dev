import { FC } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

interface ButtonProps {
  to: string;
  text: string;
}

export const Button: FC<ButtonProps> = ({ to, text }) => (
  <Link to={to} className="button">
    {text}
  </Link>
);
