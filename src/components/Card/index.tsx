import { FC, ReactElement } from "react";
import "./styles.scss";

interface CardProps {
  title: string;
  description: string;
  icon: ReactElement;
  image: string;
  button?: ReactElement;
}

export const Card: FC<CardProps> = (props) => (
  <div className="card">
    <img className="card__image" src={props.image} alt={props.title} />

    <div className="card__content">
      <div className="card__icon">{props.icon}</div>
      <h4 className="card__title">{props.title}</h4>
      <p className="card__description">{props.description}</p>

      {props.button}
    </div>
  </div>
);
