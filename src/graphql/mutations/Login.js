import { gql } from "@apollo/client";

export const LOGIN_USER_MUTATION = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      email,
      phone,
      authToken,
      name,
      userId
    }
  }
`;
