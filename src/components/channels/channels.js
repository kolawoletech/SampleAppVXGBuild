import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { fetchChannelImage, newRegisterUser } from "../../actions/api/actions";
import { ChannelItems } from "./channelItems";
import { CacheImage } from "./cacheImage";
import { Menu } from './menu'

import { AsyncStorage } from "react-native";
import {  OfflineNotice } from "./offlineNotice";

import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);

    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      isConnected: true
    };




  }


  async componentDidMount() {
    this.checkUserSignedIn();
  }


  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  }

  componentWillUnmount() {
  }
  

 
  async checkUserSignedIn() {
    try {
      let value = await AsyncStorage.getItem("username");
      if (value != null) {
        // do something
        console.log("Logged In Already");
      } else {
        // do something else

        const userId = "anonymous";

        AsyncStorage.setItem("username", userId).then(token => {
          console.log(token);
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(err);
    }
  }



  async componentWillMount() {
    await this.getChannelsWithAID()
    const { channels: data } = this.props;
    this.setState = {
      channels: data
    };

    const { orientation : rotated } = this.props;


    
  }


  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }


  async getChannelsWithAID(){
    let TOKENID = await AsyncStorage.getItem("sessionTokenID");
    let AID = await AsyncStorage.getItem("aid");
    this.props.registerWithAID(AID, TOKENID)
  }

 
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      />
    );
  };

  render() {
    const { channels: data } = this.props;
    const { orientation: rotated } = this.props;

    if ( this.props.channels.data === 0 ||this.props.channels == null ){
      return (
          <LoadingIndicator />
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
         
          <OfflineNotice />

          <Text  orientation={this.state.orientation}></Text>

          <ChannelItems orientation={this.state.orientation}  list={data} onPressItem={this.onRemoveChannel} />
          </ScrollView>
          <Menu />
        </View>
        
      );
    }
 
  }
}

const mapStateToProps = ({ routes, apiReducer: { channels, channel }, orientation }) => ({
  routes: routes,
  //token: apiReducer.token,
  channels: channels,
  orientation: orientation,
  channel: channel
});

const mapDispatchToProps = {
  getImageURI: fetchChannelImage,
  registerWithAID: newRegisterUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
