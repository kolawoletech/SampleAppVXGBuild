import React, { Component } from 'react';
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

import ChannelsContainer from '../channels';
import ChannelContainer from '../channel';
import PlayerContainer from '../player';



import CatalogueContainer from '../catalogue';
import ProgramContainer from '../program';
//import PlaylistContainer from '../playlist';
import MediaContainer from '../media';
import TabsContainer from '../tabs';
import LandingContainer from '../landing'
import configureStore from '../../store';
//import MenuContainer from '../menu';

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

  render() {
    return (
      <Provider store={store}>
        <RouterRedux hideNavBar={true} navigationBarStyle={styles.navBar} tintColor="#ffffff" titleStyle={styles.barButtonTextStyle}>
        <Drawer
            title="Menu"
            type="overlay"
            key="root"
            drawerPosition='100'
           
            contentComponent={TabsContainer}>
          <Stack key="root" >      
              <Scene key="login" hideNavBar={true} component={SessionContainer} title="Login" />
              <Scene key="signup" component={SignupContainer} title="Signup" />
              <Scene key="home" component={HomeContainer} title="Home" />
              <Scene key="channels"   component={ChannelsContainer} title="Channels"  />
              <Scene key="channel" component={ChannelContainer} title="Channel" />
              <Scene key="player"  hideNavBar={true} component={PlayerContainer} title="Player" />
              <Scene key="catalogue" component={CatalogueContainer} title="Catalogue" />
              <Scene key="program" component={ProgramContainer} title="Program" />
              <Scene key="guide" component={GuideContainer} title="Guide" />
              <Scene key="settings" component={SettingsContainer} title="Settings"  initial={true} />
              <Scene key="messages" component={MessagesContainer} title="Messages" />
              <Scene key="landing" component={LandingContainer} title="Landing" />
              <Scene key="media" component={MediaContainer} title="Media"  />

            </Stack>
            </Drawer>
        </RouterRedux>
      </Provider>
    );
  }
}
