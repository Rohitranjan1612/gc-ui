import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { SIGNUP_USER_MUTATION } from "../graphql/mutations/Signup";
import { useMutation } from "@apollo/client";
const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  border: 1px solid #f0f3f6;
  height: 100vh;
  padding: 20px;
  margin: auto;
`;
const Footer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const TitleText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #47464a;
  margin-left: 0.625rem;
  margin-bottom: 1.625rem;
  margin-right: 0.625rem;
`;
const style = {
  formStyle: {
    width: "60%",
    marginTop: 10,
  },
};
function SignUpScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const [signupUser] = useMutation(SIGNUP_USER_MUTATION);

  const createUser = () => {
    if (password === confirmPassword) {
      console.log({
        variables: {
          email: email,
          password: password,
          name: `${firstName} ${lastName}`,
        },
      });
      signupUser({
        variables: {
          email: email,
          password: password,
          name: `${firstName} ${lastName}`,
        },
      })
        .then((resp) => {
          console.log({ resp });
          props.history.push({
            pathname: "/home",
            state: {
              data: resp.data ? resp.data.login : null,
            },
          });
        })
        .catch((err) => {
          console.log({ ess: err });
          setShowError(true);
        });
    } else {
      setShowPasswordError(true);
    }
  };
  return (
    <OuterContainer>
      {showError ? (
        <Alert
          type="error"
          message="Someting Went Wrong! Please try again later."
          banner
          closable
          onClose={() => setShowError(false)}
        />
      ) : null}
      {showPasswordError ? (
        <Alert
          type="error"
          message="Password and confirm password don't match."
          banner
          style={{ marginTop: 10 }}
          closable
          onClose={() => setShowPasswordError(false)}
        />
      ) : null}
      <h1 style={{ marginTop: 40 }}>Group Chat</h1>
      <TitleText>Sign up for your account</TitleText>
      <Input
        placeholder="Enter First Name"
        style={style.formStyle}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <Input
        placeholder="Enter Last Name"
        style={style.formStyle}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <Input
        placeholder="Enter Email"
        style={style.formStyle}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input.Password
        style={style.formStyle}
        placeholder="Enter Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Input.Password
        style={style.formStyle}
        placeholder="Confirm Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <Button style={style.formStyle} type="primary" onClick={createUser}>
        Continue
      </Button>
      <hr style={{ marginTop: 20, width: "80%" }}></hr>
      <Footer>
        <Button type="link" onClick={() => props.history.push("/")}>
          Already have an Group Chat account? Log in
        </Button>
      </Footer>
    </OuterContainer>
  );
}

export default SignUpScreen;
