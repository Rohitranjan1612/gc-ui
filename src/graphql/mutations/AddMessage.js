import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation addMessage($message: String, $groupId: ID!, $authToken: String) {
    addMessage(message: $message, groupId: $groupId, authToken: $authToken) {
      id
    }
  }
`;