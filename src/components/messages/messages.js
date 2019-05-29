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
  constructor(props) {
    super(props);
    this.getMessagesWithAID();
   // this.getMessagesWithAID = this.getMessagesWithAID.bind(this);
    console.log("Constructor Working")
  }
  async componentDidMount() {
    console.log("Loaded MESSAGES" + JSON.stringify(this.props));
  }

  async componentWillMount(){
   // this.getMessagesWithAID();

  }

  async getMessagesWithAID(){
    console.log("Trying to get Messages")
    let TOKENID = await AsyncStorage.getItem("sessionTokenID");
    this.props.loadChats( TOKENID );
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


    return (
        <View
          style={{ height: '100%' , backgroundColor: '#0F516C'}}>
          <MessageItems list={data} />
         </View>
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
