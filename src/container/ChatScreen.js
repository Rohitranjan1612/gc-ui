import React, { Component } from "react";
import styled from "styled-components";
import { Avatar, Input, Button, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const OuterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  border: 1px solid #f0f3f6;
  max-width: 400px;
  margin: auto;
`;
const Footer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f3f6;
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

const SenderMessageContainer = styled.div`
  width: 272px;
  margin-bottom: 10px;
  background: #f0f3f6;
  border-radius: 12px;
`;
const SenderName = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 0px;
  margin-right: 10px;
  line-height: 21px;
  color: #0f0b28;
`;
const SenderChatMessage = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 21px;
  color: #0f0b28;
`;

const SelfMessageContainer = styled.div`
  width: 272px;
  background: #092096;
  margin-bottom: 10px;
  align-self: flex-end;
  border-radius: 12px;
`;
const SelfName = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 0px;
  margin-right: 10px;
  line-height: 21px;
  color: #ffffff;
`;
const SelfChatMessage = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 21px;
  color: #ffffff;
`;

class ChatScreen extends Component {
  render() {
    return (
      <OuterContainer>
        <Header>
          <TitleText>Group Chat</TitleText>
          <Popconfirm
            title="Are you sure you want to logout?"
            placement="bottom"
            // icon={null}
            onConfirm={this.logoutUser}
            cancelText="No"
            okText="Logout"
          >
          <Avatar
            style={{ backgroundColor: "#87d068", marginTop: 5 }}
            icon={<UserOutlined />}
          />
          </Popconfirm>
        </Header>
        <BodyContainer>
          <SenderMessageContainer>
            <SenderName>Group Chat</SenderName>
            <SenderChatMessage>Group Chat</SenderChatMessage>
          </SenderMessageContainer>
          <SelfMessageContainer>
            <SelfName>Group Chat</SelfName>
            <SelfChatMessage>Group Chat</SelfChatMessage>
          </SelfMessageContainer>
        </BodyContainer>
        <Footer>
          <TextArea
            placeholder="Type a message"
            style={{ width: "80%", marginRight: 10, marginBottom: 10 }}
          />
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            onClick={() => this.props.history.push("/home")}
          >
            Send
          </Button>
        </Footer>
      </OuterContainer>
    );
  }
}

export default ChatScreen;
