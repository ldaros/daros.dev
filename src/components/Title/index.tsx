import { FC, ReactElement } from "react";

import "./styles.scss";

interface TitleProps {
  id?: string;
  icon?: ReactElement;
  children: string;
}

export const Title: FC<TitleProps> = ({ children, id, icon }) => (
  <div className="title">
    {icon && <div className="title__icon">{icon}</div>}

    <h2 id={id} className="title__text">
      {children}
    </h2>
  </div>
);
