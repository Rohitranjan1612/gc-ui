import React, { Component } from "react";
import styled from "styled-components";
import { Avatar, Card, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border: 1px solid #f0f3f6;
  width: 100%;
  max-width: 400px;
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #f0f3f6;
`;

const BodyContainer = styled.div`
  display: flex;
  flex: 10;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;
const TitleText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #0f0b28;
  margin-top: 10px;
`;

const WelcomeText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #0f0b28;
  margin-top: 10px;
`;

class HomeScreen extends Component {
  render() {
    return (
      <OuterContainer>
        <Header>
          <TitleText>Group Chat</TitleText>
          <Avatar
            style={{ backgroundColor: "#87d068", marginTop: 5 }}
            icon={<UserOutlined />}
          />
        </Header>
        <BodyContainer>
          <WelcomeText>Welcome to Group Chat!</WelcomeText>
          <Card
            title="Default size card"
            extra={
              <Button
                type="link"
                onClick={() => this.props.history.push("/chat")}
              >
                Chat
              </Button>
            }
          >
            <p>
              The href attribute requires a valid value to be accessible.
              Provide a valid, navigable address as the href value. If you
              cannot provide a valid href, but still need the element to
              resemble a link, use a button and change it with appropriate
              styles. Learn more:
              https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
            </p>
          </Card>
        </BodyContainer>
      </OuterContainer>
    );
  }
}

export default HomeScreen;