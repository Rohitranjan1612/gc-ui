import { gql } from "@apollo/client";

export const FETCH_ALL_GROUPS = gql`
{
    groups{
      description
      groupId
      name
    }
  }
`;
