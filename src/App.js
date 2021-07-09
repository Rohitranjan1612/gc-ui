import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import LoginScreen from './container/LoginScreen';
import SignUpScreen from './container/SignUpScreen';
import HomeScreen from './container/HomeScreen';
import ChatScreen from './container/ChatScreen';
import 'antd/dist/antd.css';

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
        <Router>
          <RouterContainer>
            <Route path="/" exact  component={LoginScreen}/>
            <Route path="/sign-up" exact  component={SignUpScreen}/>
            <Route path="/home" exact  component={HomeScreen}/>
            <Route path="/chat" exact  component={ChatScreen}/>
          </RouterContainer>
        </Router>
      </OuterContainer>
    );
  }
}

export default App;
