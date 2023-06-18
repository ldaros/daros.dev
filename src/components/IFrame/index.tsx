import { FC } from "react";

import "./styles.scss";

interface IFrameProps {
  src: string;
}

export const IFrame: FC<IFrameProps> = ({ src }) => {
  return <iframe src={src} className="iframe"></iframe>;
};
