import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Card, Button, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_GROUPS } from "../graphql/queries/Groups";

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

function HomeScreen(props) {
  const [groups, setGroups] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const { error, loading, data } = useQuery(FETCH_ALL_GROUPS);
  useEffect(() => {
    console.log({ data, props });
    if (props.location.state && props.location.state.data.userId) {
      setUserDetails(props.location.state.data.userId);
      if (data) {
        setGroups(data.groups);
      }
    } else {
      props.history.push("/");
    }
  }, [data]);
  return (
    <OuterContainer>
      <Header>
        <TitleText>Group Chat</TitleText>
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
        <WelcomeText>Welcome to Group Chat!</WelcomeText>
        {groups.length
          ? groups.map((group) => {
              return (
                <Card
                  title={group.name}
                  style={{ marginTop: 10 }}
                  extra={
                    <Button
                      type="link"
                      onClick={() =>
                        props.history.push({
                          pathname: "/chat",
                          state: {
                            data: { group, userDetails },
                          },
                        })
                      }
                    >
                      Chat
                    </Button>
                  }
                >
                  <p>{group.description}</p>
                </Card>
              );
            })
          : null}
      </BodyContainer>
    </OuterContainer>
  );
}

export default HomeScreen;
