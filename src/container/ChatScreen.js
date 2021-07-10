import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Input, Button, Popconfirm } from "antd";
import { UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import { FETCH_ALL_GROUPS } from "../graphql/queries/Groups";

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

const LeftIcon = styled(LeftOutlined)`
  size: 24px;
  color: #0f0b28;
`;
const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  padding-right: 20px;
  padding-top: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #f0f3f6;
`;
const SubHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

function ChatScreen(props) {
  const [group, setGroup] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const { error, loading, data } = useQuery(FETCH_ALL_GROUPS);
  useEffect(() => {
    console.log({ data, props });
    if (props.location.state && props.location.state.data.userDetails.userId) {
      setUserDetails(props.location.state.data.userDetails);
      setGroup(props.location.state.data.group);
    } else {
      props.history.replace("/");
    }
  }, [data]);
  return (
    <OuterContainer>
      <Header>
        <SubHeader>
          <Button
            type="text"
            style={{ marginTop: 6 }}
            onClick={() => props.history.goBack()}
          >
            <LeftIcon />
          </Button>
          <TitleText>{group ? group.name : null}</TitleText>
        </SubHeader>
        <Popconfirm
          title="Are you sure you want to logout?"
          placement="bottom"
          // icon={null}
          onConfirm={() => props.history.replace("/")}
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
        <MessageList userDetails={userDetails} group={group} />
      </BodyContainer>
      <MessageForm userDetails={userDetails} group={group} />
    </OuterContainer>
  );
}

export default ChatScreen;
