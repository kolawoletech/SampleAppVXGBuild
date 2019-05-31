import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchChannelChats , fetchChatStream} from '../../actions/api/actions';
//import { LinearGradient } from 'expo';
import { AsyncStorage } from 'react-native';
import { ChatItem } from './chatItem';
import axios from "axios";

import tenaciousFetch from 'tenacious-fetch'


class Chats extends Component {
  constructor(props) {
    super(props);

  }





  async componentDidMount() {
    console.log("Loaded MESSAGES" + JSON.stringify(this.props));
    var id = 28
    var url = "https://nile.rtst.co.za/api/artist/6/channels/28/messages";
    console.log(url);
    console.log(id);

    const options = {
      retryOn: [502],
      timeout: 5000,
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJjOTBiZjJiZS00NTliLTQ2YmQtOWFjNS0wNjkzZjA3ZDU0YWMiLCJ0YWdzIjpbXSwiaWF0IjoxNTU5MjA5ODc4LCJleHAiOjE1NTkyOTYyNzh9.DSB8GLZ2lnM0O_arKBg_5yodoJoFpYtULOZj2wnW4f0",
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const optionsR = {

      method: "GET",
      headers:new Headers({
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJjOTBiZjJiZS00NTliLTQ2YmQtOWFjNS0wNjkzZjA3ZDU0YWMiLCJ0YWdzIjpbXSwiaWF0IjoxNTU5MjA5ODc4LCJleHAiOjE1NTkyOTYyNzh9.DSB8GLZ2lnM0O_arKBg_5yodoJoFpYtULOZj2wnW4f0",
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const additionalTenaciousFetchConfig = {
      fetcher: window.fetch, 
      retries: 3,          
      retryDelay: 1000 * 3,
      onRetry: ({retriesLeft, retryDelay, response}) => console.log(retriesLeft, retryDelay, response),
      retryStatus : [],      
      timeout :1000 * 100,
      factor: 0.5

    };

    const config = Object.assign({}, optionsR, additionalTenaciousFetchConfig)
    console.log("Tenaciou D")
    tenaciousFetch(url, config).then(console.log).catch(console.error)
  }


  
  componentWillMount(){

  }





  FlatListItemSeparator = () => {
    return (
      <View 
        style={{
            height: .5,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
    );
  }

  render() {



    return (
        <View
          style={{ height: '100%' , backgroundColor: '#0F516C'}}>
         <Text>Hello Chats</Text>
          <ChatItem />
         </View>
    );
  }
}

const mapStateToProps = ({   }) => ({

});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
