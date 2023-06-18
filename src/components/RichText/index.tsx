import { FC, HTMLAttributes } from "react";
import "./styles.scss";

interface RichTextProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

export const RichText: FC<RichTextProps> = ({ children, ...rest }) => (
  <div
    className="rich-text"
    dangerouslySetInnerHTML={{ __html: children }}
    {...rest}
  />
);
