import { FC } from "react";

import "./styles.scss";

interface CardGridProps {
  id?: string;
  children: React.ReactNode;
}

export const CardGrid: FC<CardGridProps> = ({ children, id }) => (
  <div className="card-grid" id={id}>
    {children}
  </div>
);
