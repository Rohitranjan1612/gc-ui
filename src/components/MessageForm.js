import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input, Button, Alert } from "antd";
import styled from "styled-components";
import { ADD_MESSAGE } from "../graphql/mutations/AddMessage";

const { TextArea } = Input;

const Footer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f3f6;
`;
const Row = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
`;
const MessageForm = ({ userDetails, group, props }) => {
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [addMessage] = useMutation(ADD_MESSAGE);
  const handleSubmit = () => {
    if (message.length > 0) {
    addMessage({
      variables: {
        userName: userDetails.name,
        message,
        groupId: group.groupId ? parseInt(group.groupId) : null,
        userId: userDetails.userId ? parseInt(userDetails.userId) : null,
      },
    })
      .then((resp) => {
        console.log({ resp });
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
    }
  };

  return (
    <Footer>
      {showError ? (
        <Alert
          type="error"
          message="Someting Went Wrong!"
          banner
          style={{ marginBottom: 10 }}
          closable
          onClose={() => setShowError(false)}
        />
      ) : null}
      <Row>
        <TextArea
          placeholder="Type a message"
          style={{
            width: "80%",
            marginRight: 10,
            marginBottom: 10,
            height: 40,
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="primary" style={{ marginTop: 5 }} onClick={handleSubmit}>
          Send
        </Button>
      </Row>
    </Footer>
  );
};

export default MessageForm;
