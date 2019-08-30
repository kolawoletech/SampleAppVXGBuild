import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from "react-native";
import { VXGMobileSDK } from "react-native-vxg-mobile-sdk";
import { Actions, ActionConst } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Symbol from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import DialogInput from "react-native-dialog-input";
import NetInfo from "@react-native-community/netinfo";
import CheckBox from "react-native-check-box";

import Messages from "./../messages";
var totalBitrate = 0;
import {
  fetchChannelChats,
  sendMessage,
  switchQuality
} from "../../actions/api/actions";

export class OPlayer extends Component {
  _url = null;
  _player = null;

  constructor() {
    super();

    this.state = { orientation: "", w: 0, h: 0 };

    this._url1 =
      "rtsp://c90bf2be-459b-46bd-9ac5-0693f07d54ac:@nile.rtst.co.za:554/NileFlow_PE_High_768x448_25_AAC.mm1";
    this._onBack = this._onBack.bind(this);
    this._play1 = this._play1.bind(this);
  }

  onLayout(e) {
    var { width, height } = Dimensions.get("window");
    console.log("<sampleJS> onLayout w:" + width + " h:" + height);
    if (width > height) {
      this.setState({ w: width, h: height });
    } else {
      this.setState({ w: width, h: height });
    }
  }

  _onBack() {
    console.log("<sampleJS> Back!");
    if (this._player) {
      console.log("<sampleJS> Close player");
      this._player.close();
    }
    Actions.pop();
  }

  async _play1() {
    // TODO reopen player
    // console.log(this._player);
    await this._player.close();
    await this._player.applyConfig({
      connectionUrl:
        "rtsp://c90bf2be-459b-46bd-9ac5-0693f07d54ac:@nile.rtst.co.za:554/NileFlow_PE_High_768x448_25_AAC.mm1",
      decodingType: 1, // HW 1, SW 0
      connectionNetworkProtocol: -1,
      numberOfCPUCores: 2,
      synchroEnable: 1,
      aspectRatioMode: 1
    });
    await this._player.open();
  }

  _assignPlayer = plr => {
    this._player = plr;
  };

  render() {
    console.log("<sampleJS> render call");
    var { width, height } = Dimensions.get("window");
    if (width > height) {
      this.state = { orientation: "landscape", w: width, h: height };
    } else {
      this.state = { orientation: "portrait", w: width, h: height };
    }

    return (
      <View
        style={[
          this.state.orientation === "portrait"
            ? styles.container
            : {
                paddingTop: 5,
                paddingBottom: 90,
                paddingLeft: 0,
                paddingRight: 0,
                marginTop: -35
              }
        ]}
        onLayout={this.onLayout.bind(this)}>
        <Button
          onPress={this._onBack}
          title={this.state.orientation === "portrait" ? "Back" : ""}
          color="#841584"
          style={
            this.state.orientation === "portrait"
              ? [{ width: "100%", height: 50 }]
              : [{ width: 0, height: 0 }]
          }
        />
        <Text
          style={
            this.state.orientation === "portrait"
              ? [{ width: "100%", height: 50 }]
              : [{ width: 0, height: 0 }]
          }>
          Example 2: More Options Player
        </Text>
        <View
          style={
            this.state.orientation === "portrait"
              ? [{ width: "100%", height: 250 }]
              : [{ width: "100%", height: "100%" }]
          }>
          <VXGMobileSDK
            ref={this._assignPlayer}
            style={[styles.player]}
          ></VXGMobileSDK>
        </View>
        <Button
          onPress={this._play1}
          title={this.state.orientation === "portrait" ? "Play" : ""}
          color="#841584"
          style={
            this.state.orientation === "portrait"
              ? [{ width: "100%", height: 50 }]
              : [{ width: 0, height: 0 }]
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ routes, apiReducer: { channel, chats } }) => ({
  routes: routes,
  channel: channel,
  chats: chats
});

const mapDispatchToProps = {
  loadChannelChats: fetchChannelChats,
  postMessage: sendMessage,
  switchStream: switchQuality
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OPlayer);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: "stretch"
  },
  player: {
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    height: "100%"
  }
});
