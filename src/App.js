import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import LoginScreen from "./container/LoginScreen";
import SignUpScreen from "./container/SignUpScreen";
import HomeScreen from "./container/HomeScreen";
import ChatScreen from "./container/ChatScreen";
import "antd/dist/antd.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({ uri: "https://8ecc79b9ff3e.ngrok.io/graphql" });
const wsLink = new WebSocketLink({
  uri: "ws://3ed05ef01a5c.ngrok.io/graphql",
  options: { reconnect: true },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: splitLink,
  cache,
});

const OuterContainer = styled.div`
  display: flex;
  flex: 1 0;
  overflow: hidden;
`;

const RouterContainer = styled.div`
  display: flex;
  flex: 1;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true,
    };
    console.log({ props });
  }

  hideModal = () => {
    this.props.hideError();
  };

  render() {
    return (
      <OuterContainer>
        <ApolloProvider client={client}>
          <Router>
            <RouterContainer>
              <Route path="/" exact component={LoginScreen} />
              <Route path="/sign-up" exact component={SignUpScreen} />
              <Route path="/home" exact component={HomeScreen} />
              <Route path="/chat" exact component={ChatScreen} />
            </RouterContainer>
          </Router>
        </ApolloProvider>
      </OuterContainer>
    );
  }
}

export default App;
