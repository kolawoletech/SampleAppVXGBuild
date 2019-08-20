import React, { Component, Alert } from 'react';
import { styles } from './styles';
import { Scene, Router, Stack, Drawer , DefaultRenderer} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { Text } from 'react-native'
import HomeContainer from '../home';
import SearchContainer from '../search';
import CounterContainer from '../counter';
import SessionContainer from '../auth/LoginForm';
import SignupContainer from '../auth/SignupForm';
import TodolistContainer from '../todolist';
import CategoryListContainer from '../categoryList';
import OfflineAlertContainer from '../offlineAlert'
import ChannelsContainer from '../channels';
import ChannelContainer from '../channel';
import PlayerContainer from '../player';

import CMasonryListContainer from '../cmasonryList';

import CategoriesContainer from '../categories';

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

import CachedCatalogueContainer from '../cachedCatalogue'
import LocalMediaContainer from '../localMedia'

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
export default class Routes extends React.PureComponent {
  state = {
    isConnected: true
  };

  componentWillMount() {

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

    const state = this.props.navigationState
    if (!__DEV__) {
      console.log = () => {};
    }


    console.log(this.state)
    console.disableYellowBox = true;
   if (this.state.isConnected === true){

    return(
      <Provider store={store}>
      <RouterRedux hideNavBar={true} navigationBarStyle={styles.navBar} tintColor="#ffffff" titleStyle={styles.barButtonTextStyle}>
      <Drawer
          ref="navigation"
          acceptPan
          onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
          onClose={() => NavigationActions.refresh({key: state.key, open: false})}
          title="Menu"
    
          type='static'
          open={true}
          key="root"
          drawerPosition='100'
          contentComponent={TabsContainer}
          tapToClose={true}
          openDrawerOffset={100}          
          panCloseMask={0.2}
          negotiatePan={true}
          tweenHandler={(ratio) => ({
              main: { opacity:Math.max(0.54,1-ratio) }
          })}
          >

              <Stack key="root"   >
                <Scene key="login" hideNavBar={true} component={SessionContainer} title="Login"   initial={true}/>

             
                <Scene key="catalogue" icon={TabIcon}  component={CatalogueContainer} title="Catalogue" />

                <Scene key="categories"  tabs={true} icon={TabIcon} component={CategoriesContainer} title="Categories"/>
                <Scene key="categorylist" component={CategoryListContainer} title="CategoryList"  />

                <Scene key="cachedCatalogue" component={CachedCatalogueContainer} title="New Catalogue" />
                <Scene key="program" component={ProgramContainer} title="Program" />

          
          
                <Scene key="signup" component={SignupContainer} title="Signup" />
   

                <Scene key="channels" tabs={true} icon={TabIcon}  component={ChannelsContainer} title="Channels" />
                <Scene key="channel" component={ChannelContainer} title="Channel" />
                <Scene key="messages" component={MessagesContainer} title="Messages" />

                <Scene key="categorylist" component={CategoryListContainer} title="CategoryList"  />
                <Scene key="masonry" component={CMasonryListContainer} title="MasonryList"  />
                <Scene key="player"  hideNavBar={true} component={PlayerContainer} title="Player" />
                <Scene key="guide" component={GuideContainer} title="Guide" />
                <Scene key="chats" component={ChatsContainer} title="Chats" />

            
                <Scene key="home" component={HomeContainer} title="Home" />

                
                <Scene key="settings" component={SettingsContainer} title="Settings" />
                <Scene key="landing" component={LandingContainer} title="Landing" />
                <Scene key="media"   hideNavBar={true} component={MediaContainer} title="Media" />
          

                <Scene key="localMedia" tabs={true} icon={TabIcon}  hideNavBar={true} component={LocalMediaContainer}  title="Playlist" />

              </Stack>
          

         
        

           
 
          </Drawer>

      </RouterRedux>
    </Provider>
    )
   } else if (this.state.isConnected === false) {
    return (
      <Provider store={store}>
        <RouterRedux hideNavBar={true} navigationBarStyle={styles.navBar} tintColor="#ffffff" titleStyle={styles.barButtonTextStyle}>
        <Drawer
            title="Menu"
            type="overlay"
            key="root"
            drawerPosition='100'
            contentComponent={TabsContainer}>
 

             
          
              <Stack key="root" direction="vertical">   
                <Scene key="media" component={MediaContainer} title="Playlist"></Scene>
                <Scene key="localMedia" component={LocalMediaContainer} title="Local Media"></Scene>
                <Scene key="offline"   hideNavBar={true} component={OfflineAlertContainer} initial={true} />
              </Stack>
         
            </Drawer>

        </RouterRedux>
      </Provider>
    );
   }

  }
}
