import { Document } from "@contentful/rich-text-types";

export interface ProjectData {
  name: string;
  description?: string;
  slug: string;
  type: "personal" | "professional";
  icon?: string;
  thumbnail?: {
    sys: {
      type: "Link";
      linkType: "Asset";
      id: string;
    };
    url: string;
  };
  content?: {
    json: Document;
  };
  gitHubRepository?: string;
  iframeLink?: string;
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
