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

//import { LinearGradient } from 'expo';

import _ from "lodash";


class Channels extends Component {
  constructor(props) {
    super(props)
  }



  
  async componentDidMount() {
    const {
      images: img
    } = this.props;
  }

/*   componentWillRecieveProps(nextProps){
    this.loadData(nextProps)
  } */
  
  loadData(nextProps){
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


    

    const {
      img: images
    } = this.props; 



    return (
  /*     <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']}
        style={{ height: '100%' }}>  */    
          <ChannelItems  logo={images} list={data} onPressItem={this.onRemoveChannel} />

/*       </LinearGradient >
 */    );
  }
}

const mapStateToProps = ({ routes, apiReducer: { channels, img, channel } }) => ({
  routes: routes,
  //token: apiReducer.token,
  channels: channels,
  img: img,
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
