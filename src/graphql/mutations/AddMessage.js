import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation addMessage($userName: String, $message: String, $groupId: ID!, $userId: ID!) {
    addMessage(userName: $userName, message: $message, groupId: $groupId, userId: $userId) {
      id
    }
  }
`;