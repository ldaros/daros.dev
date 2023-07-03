import { gql } from "@apollo/client";

export const getProjectBySlug = gql`
  query getProjectBySlug($slug: String!) {
    projectCollection(where: { slug: $slug }) {
      items {
        slug
        name
        type
        icon
        content {
          json
        }
        iframeLink
        gitHubRepository
      }
    }
  }
`;
