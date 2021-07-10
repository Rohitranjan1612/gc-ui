import { gql } from "@apollo/client";

export const SIGNUP_USER_MUTATION = gql`
mutation Signup($email: String, $password: String, $name: String) {
  signup(email: $email, password: $password, name: $name, userType: "user") {
    email,
    phone,
    authToken,
    name,
    userId,
  }
}
`;
