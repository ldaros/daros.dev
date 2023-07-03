import { FC, HTMLAttributes } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Document } from "@contentful/rich-text-types";

import "./styles.scss";

interface RichTextProps extends HTMLAttributes<HTMLDivElement> {
  data?: Document;
}

export const RichText: FC<RichTextProps> = ({
  data = null,
  className = "",
  ...props
}) => {
  const htmlContent = data ? documentToHtmlString(data) : "";

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      {...props}
    />
  );
};
