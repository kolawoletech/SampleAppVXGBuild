import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchChannelChats , fetchChatStream} from '../../actions/api/actions';
import { MessageItems } from './messageItems';
//import { LinearGradient } from 'expo';
import { AsyncStorage } from 'react-native';

var data = require('./data.json');


 
class Messages extends Component {

  async componentDidMount() {
    //this.props.loadChats();
    await this.getMessagesWithAID();
    console.log("Loaded MESSAGES" + JSON.stringify(this.props));
  }

  async getMessagesWithAID(){
    let AID = await AsyncStorage.getItem("aid");
    //this.props.registerWithAID(AID)
    const channel = this.props.channel;

    this.props.loadChats(AID);

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
   
    const {
      chats: chatsData
    } = this.props;

 

    //console.log(JSON.stringify(this.props))
    

    return (
/*       <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
        style={{ height: '100%' }}> */
        <View
          style={{ height: '100%' , backgroundColor: '#0F516C'}}>
          <MessageItems list={chatsData} />
         </View>

      /* </LinearGradient> */



    );
  }
}

const mapStateToProps = ({  apiReducer: { chats} }) => ({
  chats: chats
});

const mapDispatchToProps = {
  loadChats: fetchChatStream,
  loadChannelChats: fetchChannelChats 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
