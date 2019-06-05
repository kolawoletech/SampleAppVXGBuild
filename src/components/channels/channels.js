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
import LinearGradient from "react-native-linear-gradient";

import { AsyncStorage } from "react-native";

import _ from "lodash";

class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: "",
      screen: Dimensions.get("window")
    };
  }


  async componentDidMount() {
    this.checkUserSignedIn();
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


    Dimensions.addEventListener("change", () => {
   /*    this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      }); */
    });


    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    
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

    if ( this.props.channels.data === 0 ||this.props.channels == null  ){
      return (
        <LinearGradient
          colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
          style={{ height: "100%" }}>
          <LoadingIndicator />
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
          style={{ height: "100%" }}>
          <ChannelItems list={data} onPressItem={this.onRemoveChannel} />
        </LinearGradient>
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
