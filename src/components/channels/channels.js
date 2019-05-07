import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { registerUser, fetchChannelImage } from '../../actions/api/actions';
import { ChannelItems } from './channelItems';
import { ChannelLogos } from './channelLogos';
import LinearGradient from 'react-native-linear-gradient';

import { AsyncStorage } from 'react-native';

import _ from "lodash";


class Channels extends Component {
  constructor(props) {
    super(props)
  }




  async componentDidMount() {
    const {
      images: img
    } = this.props;
    
    this.checkUserSignedIn();
   

  }

  async checkUserSignedIn(){
    let context = this;
    try {
       let value = await AsyncStorage.getItem('username');
       if (value != null){
          // do something 
          console.log("Logged In Already")
       }
       else {
          // do something else

          const userId = 'anonymous';

    
          AsyncStorage.setItem('username', userId).then((token) => {
            console.log(token)
          });
      }
    } catch (error) {
      // Error retrieving data
      console.log(err)
    }
}

  /*   componentWillRecieveProps(nextProps){
      this.loadData(nextProps)
    } */

  loadData(nextProps) {
    // Create a request based on nextProps

  }
  async componentWillMount() {
    await this.getChannelsWithoutImage()
    //await this.props.getImageURI([2,5,17,16,8])
    const {
      channels: data,

    } = this.props;
    this.setState = {
      channels: data
    }

    await this.getChannelImages();
  }


  async getChannelsWithoutImage() {
    this.props.register()

  }

  async getChannelImages() {

  }


  FlatListItemSeparator = () => {
    return (
      <View style={{
        flexDirection: 'row',
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      />
    );
  }

  render() {

    const {
      channels: data,

    } = this.props;

    //console.log(this.props)



    let id = _.map(data, function (item) {
      id = item['id']
      //this.props.getImageURI(id)

      return id

    })
    let ids = this.props
    //console.log("Is this an Array: " + JSON.stringify(ids))








    return (
      <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
        style={{ height: '100%' }}>
        <ChannelItems list={data} onPressItem={this.onRemoveChannel} />

      </LinearGradient >
    );
  }
}

const mapStateToProps = ({ routes, apiReducer: { channels, channel } }) => ({
  routes: routes,
  //token: apiReducer.token,
  channels: channels,
 
  channel: channel
});

const mapDispatchToProps = {
  register: registerUser,
  getImageURI: fetchChannelImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
