import { gql } from "@apollo/client";

export const FETCH_ALL_GROUPS = gql`
  query groups($authToken: String) {
    groups(authToken: $authToken) {
      description
      groupId
      name
    }
  }
`;

export const GET_MESSAGES = gql`
  query messages($groupId: ID, $authToken: String) {
    messages(groupId: $groupId, authToken: $authToken) {
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
