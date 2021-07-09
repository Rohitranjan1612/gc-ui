import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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
class LoginScreen extends Component {
  render() {
    return (
      <OuterContainer>
        <h1 style={{ marginTop: 40 }}>Group Chat</h1>
        <TitleText>Kindly login to your account</TitleText>
        <Input placeholder="Enter Email" style={style.formStyle} />
        <Input.Password
          style={style.formStyle}
          placeholder="Enter Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button style={style.formStyle} type="primary" onClick={() => this.props.history.push("/home")}>
          Continue
        </Button>
        <hr style={{ marginTop: 20, width: "80%" }}></hr>
        <Footer>
          <Button type="link" onClick={() => this.props.history.push("/sign-up")}>
            Sign up for your account
          </Button>
        </Footer>
      </OuterContainer>
    );
  }
}

export default LoginScreen;
