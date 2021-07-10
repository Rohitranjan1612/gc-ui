import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES, MESSAGE_SUB } from "../graphql/queries/Groups";
import styled from "styled-components";
import moment from "moment";

const getFormattedTime = (timestamp) =>
  moment(timestamp).format("DD MMM YYYY, h:mm A");
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
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
  font-size: 12px;
  margin-left: 10px;
  margin-bottom: 0px;
  margin-right: 10px;
  line-height: 21px;
  color: #0f0b28;
`;
const SenderChatMessageTime = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  text-align: right;
  margin-bottom: 2px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 21px;
  color: #0f0b28;
`;

const SelfMessageContainer = styled.div`
  width: 200px;
  background: #092096;
  margin-bottom: 10px;
  align-self: flex-end;
  border-radius: 12px;
`;

const SelfChatMessage = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 0px;
  line-height: 21px;
  color: #ffffff;
`;

const SelfChatMessageTime = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  text-align: right;
  margin-bottom: 2px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 21px;
  color: #ffffff;
`;

const MessageList = ({ userDetails, group }) => {
  const { data, loading, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: { groupId: group.groupId },
  });

  useEffect(() => {
    console.log({ data });
    if (subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_SUB,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const newMessage = subscriptionData.data.newMessage;
          const updatedMessageList = Object.assign({}, prev, {
            messages: [...prev.messages, newMessage],
          });
          return updatedMessageList;
        },
      });
    }
  }, []);

  if (!loading && data) {
    console.log({ userDetails, message: data.messages });
    var messageMap = data.messages.map((message) => {
      const MessageType =
        message.userId === userDetails.userId
          ? "message-outgoing"
          : "message-incomming";
      return (
        <Container>
          {MessageType === "message-incomming" ? (
            <SenderMessageContainer>
              <SenderName>{message.userName}</SenderName>
              <SenderChatMessage>{message.message}</SenderChatMessage>
              <SenderChatMessageTime>
                {getFormattedTime(moment())}
              </SenderChatMessageTime>
            </SenderMessageContainer>
          ) : (
            <SelfMessageContainer>
              <SelfChatMessage>{message.message}</SelfChatMessage>
              <SelfChatMessageTime>
                {getFormattedTime(moment())}
              </SelfChatMessageTime>
            </SelfMessageContainer>
          )}
        </Container>
      );
    });
  }

  return !loading && <div className="message-list">{messageMap}</div>;
};

export default MessageList;
