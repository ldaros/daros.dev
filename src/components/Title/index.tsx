import { FC } from "react";

import "./styles.scss";

interface TitleProps {
  id?: string;
  children: string;
}

export const Title: FC<TitleProps> = ({ children, id }) => (
  <h2 id={id} className="title">
    {children}
  </h2>
);
