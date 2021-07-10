import { gql } from "@apollo/client";

export const FETCH_ALL_GROUPS = gql`
  {
    groups {
      description
      groupId
      name
    }
  }
`;

export const GET_MESSAGES = gql`
  query messages($groupId: ID) {
    messages(groupId: $groupId) {
      id
      userId
      groupId
      message
      userName
      createdAt
    }
  }
`;

export const MESSAGE_SUB = gql`
  subscription {
    newMessage {
      id
      userId
      groupId
      message
      userName
      createdAt
    }
  }
`;
