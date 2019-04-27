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

 
class Messages extends Component {

  componentDidMount() {
    //this.props.loadMessages();
    this.props.loadChats();
    console.log("Loaded MESSAGES" + JSON.stringify(this.props));
    //setInterval(() => { this.props.loadChats(), console.log("Run Later") }, 5);


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

 

    console.log(JSON.stringify(this.props))
    

    return (
/*       <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
        style={{ height: '100%' }}> */
        <View
        style={{ height: '100%' }}>
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
  loadChats: fetchChatStream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
