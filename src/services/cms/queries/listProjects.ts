import { gql } from "@apollo/client";

export const listProjects = gql`
  query listProjects {
    projectCollection {
      items {
        slug
        name
        type
        icon
        description
        thumbnail {
          url
        }
      }
    }
  }
`;
