import { FC, ReactNode } from "react";
import "./styles.scss";

interface GridProps {
  children: ReactNode;
}

export const Grid: FC<GridProps> = ({ children }) => (
  <div className="app__grid">{children}</div>
);
