import { FC, ReactNode } from "react";

import "./styles.scss";

interface BannerProps {
  id: string;
  title: string;
  description: string;
  button: ReactNode;
  children: ReactNode;
}

export const Banner: FC<BannerProps> = (props) => (
  <div className="banner" id={props.id}>
    <div className="banner__left">{props.children}</div>

    <div className="banner__right">
      <h3 className="banner__title">{props.title}</h3>
      <p className="banner__description">{props.description}</p>
      {props.button}
    </div>
  </div>
);
