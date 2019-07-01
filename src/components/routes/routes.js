import React, { Component, Alert } from 'react';
import { styles } from './styles';
import { Scene, Router, Stack, Drawer } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { Text } from 'react-native'
import HomeContainer from '../home';
import SearchContainer from '../search';
import CounterContainer from '../counter';
import SessionContainer from '../auth/LoginForm';
import SignupContainer from '../auth/SignupForm';
import TodolistContainer from '../todolist';

import OfflineAlertContainer from '../offlineAlert'
import ChannelsContainer from '../channels';
import ChannelContainer from '../channel';
import PlayerContainer from '../player';

import CMasonryListContainer from '../cmasonryList';

//import AdvancedMediaPlayerContainer from '../advancedMediaPlayer';

//import VideoPlayerContainer from '../advancedMediaPlayer';

import CatalogueContainer from '../catalogue';
import ProgramContainer from '../program';
//import PlaylistContainer from '../playlist';
import MediaContainer from '../media';
import TabsContainer from '../tabs';
import LandingContainer from '../landing'
import configureStore from '../../store';
//import MenuContainer from '../menu';
import ChatsContainer from '../chats'
import NetInfo from "@react-native-community/netinfo";


import GuideContainer from '../guide';
import MessagesContainer from '../messages';
import SettingsContainer from '../settings';
const store = configureStore();
const RouterRedux = connect()(Router);
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? '#76B6C4' : '#0F516C', fontSize: 20 }}>{title}</Text>
  );
}
export default class Routes extends React.Component {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <RouterRedux hideNavBar={true} navigationBarStyle={styles.navBar} tintColor="#ffffff" titleStyle={styles.barButtonTextStyle}>
        <Drawer
            title="Menu"
            type="overlay"
            key="root"
            drawerPosition='100'
            contentComponent={TabsContainer}>
 
            {this.state.isConnected === true  && (
              <Stack key="root" direction="vertical">    
                <Scene key="login" hideNavBar={true} component={SessionContainer} title="Login" initial={true} />
                <Scene key="signup" component={SignupContainer} title="Signup" />
                <Scene key="home" component={HomeContainer} title="Home" />
                <Scene key="channels"   component={ChannelsContainer} title="Channels"  />
                <Scene key="channel" component={ChannelContainer} title="Channel" />
                <Scene key="player"  hideNavBar={true} component={PlayerContainer} title="Player" />
                <Scene key="catalogue" component={CatalogueContainer} title="Catalogue"/>
                <Scene key="program" component={ProgramContainer} title="Program" />
                <Scene key="guide" component={GuideContainer} title="Guide" />
                <Scene key="settings" component={SettingsContainer} title="Settings" />
                <Scene key="messages" component={MessagesContainer} title="Messages" />
                <Scene key="landing" component={LandingContainer} title="Landing" />
                <Scene key="chats" component={ChatsContainer} title="Chats" />
                <Scene key="media"   hideNavBar={true} component={MediaContainer} title="Media" />
                <Scene key="masonry" component={CMasonryListContainer} title="MasonryList"></Scene>
              </Stack>
            )}
             
            {this.state.isConnected === false  && (
              <Stack key="root" direction="vertical">     
                <Scene key="offline"   hideNavBar={true} component={OfflineAlertContainer} initial={true} />
              </Stack>
            )}
            </Drawer>
{/*             <Stack key="root2" direction="vertical">    
             
              <Scene key="channels"   component={ChannelsContainer} title="Channels"  />
              <Scene key="catalogue" component={CatalogueContainer} title="Catalogue"/>
              <Scene key="media"   hideNavBar={true} component={MediaContainer} title="Media" />
            </Stack> */}
        </RouterRedux>
      </Provider>
    );
  }
}
