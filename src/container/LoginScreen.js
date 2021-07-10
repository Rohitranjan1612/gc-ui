import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LOGIN_USER_MUTATION } from "../graphql/mutations/Login";
import { useMutation } from "@apollo/client";

const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0f3f6;
  height: 100vh;
  width: 100%;
  max-width: 400px;
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
function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER_MUTATION);

  const addUser = () => {
    loginUser({
      variables: {
        email: email,
        password: password,
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
        console.log(err);
        setShowError(true);
      });
  };
  return (
    <OuterContainer>
      {showError ? (
        <Alert
          type="error"
          message="Someting Went Wrong! Please check you enter correct email and password."
          banner
          closable
          onClose={() => setShowError(false)}
        />
      ) : null}
      <h1 style={{ marginTop: 40 }}>Group Chat</h1>
      <TitleText>Kindly login to your account</TitleText>
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Button style={style.formStyle} type="primary" onClick={addUser}>
        Continue
      </Button>
      <hr style={{ marginTop: 20, width: "80%" }}></hr>
      <Footer>
        <Button type="link" onClick={() => props.history.push("/sign-up")}>
          Sign up for your account
        </Button>
      </Footer>
    </OuterContainer>
  );
}

export default LoginScreen;
