import { FC, ReactNode } from "react";
import { Button } from "~/components";

import "./styles.scss";

interface BannerProps {
  id: string;
  title: string;
  description: string;
  button: string;
  link: string;
  children: ReactNode;
}

export const Banner: FC<BannerProps> = (props) => (
  <div className="banner" id={props.id}>
    <div className="banner__left">{props.children}</div>

    <div className="banner__right">
      <h3 className="banner__title">{props.title}</h3>
      <p className="banner__description">{props.description}</p>
      <Button to={props.link} text={props.button} />
    </div>
  </div>
);
