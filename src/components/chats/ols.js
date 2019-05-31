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
import {expect} from 'chai';
import fetch from 'react-native-fetch-polyfill';

import axiosRequest from '@nelsonomuto/axios-request-timeout';


class Chats extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    console.log("Loaded MESSAGES" + JSON.stringify(this.props));
    var id = 28
    var url = "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/messages";
    console.log(url);
    console.log(id);

    const options = {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJjOTBiZjJiZS00NTliLTQ2YmQtOWFjNS0wNjkzZjA3ZDU0YWMiLCJ0YWdzIjpbXSwiaWF0IjoxNTU5MTIzMDk1LCJleHAiOjE1NTkyMDk0OTV9.JhbU5z_MUZXhDbHUIsiP5yVNy1uMqhEeINYW89kUWv8",
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      timeout: 30 * 1000
    };

    return await fetch(url, options)
    .then(response => {
      // a successful response
      console.log("Awaiting Response" + JSON.stringify(response))
    })
    .catch(error => {
      // an error when the request fails, such as during a timeout
      console.log("Awaiting Error" + JSON.stringify(error))
      
      
    })


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
