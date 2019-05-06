import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import DialogInput from "react-native-dialog-input";

import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { database } from "firebase";
import { connect } from "react-redux";
import { VXGMobileSDK } from "react-native-vxg-mobile-sdk";
import Icon from "react-native-vector-icons/MaterialIcons";
import Symbol from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
const { width, height } = Dimensions.get("window");

import Messages from "./../messages";
var data = require("./data.json");

import { fetchChannelChats, sendMessage } from "../../actions/api/actions";

export class Player extends React.Component {
  _url = null;
  _player = null;

  constructor() {
    super();
    this._onBack = this._onBack.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.state = {
      newMessage: "",
      isDialogVisible: false,
      progress: 0,
      indeterminate: true
    };
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        // We have data!!
        console.log(value);

        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async loadUsername() {
    try {
      const username = await AsyncStorage.getItem("username");
      this.setState({ username: username });
    } catch (error) {
      // Manage error handling
    }
  }

  componentDidMount() {
    console.log("PLAYER PAYLOAD:............" + JSON.stringify(this.props));
    this.loadUsername();
    this.animate();
    const channel = this.props.channel;

    console.log("Props From Player" + JSON.stringify(this.props));

    setTimeout(() => {
      this.props.loadChannelChats(channel.id);
      //console.log("Props From TimeOut" + JSON.stringify(this.props));
    }, 3000);
  }

  _onBack = () => {
    Actions.pop();

    this._player.close();
  };

  checkIfAnon() {
    if (username === "" || username === "anonymous") {
      this.setState({
        isDialogVisible: true
      });
    }
  }

  sendInput(inputText) {
    console.log("sendInput (DialogInput#1):s " + inputText);

    AsyncStorage.setItem("username", inputText).then(token => {
      console.log(token);
    });
    this.setState({
      isDialogVisible: false
    });
    setTimeout(() => {
      //this.props.loadChannelChats(channel.id);
      const updatedUsername = AsyncStorage.getItem("username");

      this.setState({
        username: updatedUsername
      });
      //console.log("Props From TimeOut" + JSON.stringify(this.props));
    }, 3000);
  }

  showDialog = () => {
    this.setState({
      isDialogVisible: false
    });
  };

  sendChat = () => {
    console.log("Sending: " + JSON.stringify(this.state.newMessage));
    console.log("Send To API");

    var content = this.state.newMessage;
    var username = this.state.username;

    if (username === "" || username === "anonymous") {
      this.setState({
        isDialogVisible: true
      });
    } else {
      var opts = {
        from: username,
        body: content
      };

      console.log("Returned Username: " + username);
      const channel = this.props.channel;

      this.props.postMessage(channel.id, opts);
    }
  };

  updateMessageState(text) {
    this.setState({ newMessage: text });
  }

  inputFocused(refName) {
    this.setTimeout(() => {
      var scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        60, //additionalOffset
        true
      );
    }, 50);
  }

  renderVideo() {
    const rstp_link = this.props.link;
    const progressBarWidth = width * 0.9;
    const iconWidth = width * 0.05;

    return (
      <View>
        <VXGMobileSDK
          style={styles.player}
          ref={this._assignPlayer}
          config={{
            connectionUrl: rstp_link,
            autoplay: true
          }}
        />
        <View style={styles.progressBarContainer}>
          <Symbol name="chevron-double-left" size={iconWidth} color="white" />

          <Progress.Bar
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            width={progressBarWidth}
            height={iconWidth}
          />

          <Symbol name="chevron-double-right" size={iconWidth} color="white" />
        </View>
      </View>
    );
  }

  _assignPlayer = plr => {
    this._player = plr;
  };

  async _play1() {
    // TODO reopen player
    // console.log(this._player);
    await this._player.close();
    await this._player.applyConfig({
      connectionUrl: rstp_link,
      autoplay: true,
      decodingType: 0, // Hardware – 1, Sofware – 0
      connectionNetworkProtocol: -1, // 0 - udp, 1 - tcp, 2 - http, 3 - https, -1 - AUTO
      numberOfCPUCores: 0, // 0<= - autodetect, > 0 - will set manually
      synchroEnable: 1, // Enable A/V synchronization, 1 - synchronization is on, 0 - is off
      connectionBufferingTime: 1000,
      connectionDetectionTime: 1000,
      startPreroll: 300,
      aspectRatioMode: 1 // 0 - stretch, 1 - fit to screen with aspect ratio, 2 - crop, 3 - 100% size, 4 - zoom mode, 5 - move mode)
    });
    await this._player.open();
  }

  render() {
    console.log("Player Objects Props : " + this.props);
    const rstp_link = this.props.link;

    const channel_details = this.chan;
    const channel = this.props.channel;

    //console.log("This IS THE QUALITY NODE " + {quality})
    //const channel_details = this.chan;
    if (this.props == "undefined") {
      return <View />;
    } else {
      //const { list } = this.props;

      return (
        <View style={styles.container}>
          <View>{this.renderVideo()}</View>

          <TouchableHighlight onPress={this._onBack}>
            <View style={styles.buttonText}>
              <Icon name="close" size={42} color="white" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                Close
              </Text>
            </View>
          </TouchableHighlight>

          <ScrollView>
            <View>
              <View style={styles.messagesContainer}>
                <Messages />
              </View>
              <View>
                <DialogInput
                  isDialogVisible={this.state.isDialogVisible}
                  title={"Set Username"}
                  //message={"Message for DialogInput #1"}

                  submitInput={inputText => {
                    this.sendInput(inputText);
                  }}
                  closeDialog={() => {
                    this.showDialog(false);
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.passwordContainer}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableHighlight
                style={{
                  width: "90%"
                }}
                onPress={this.checkIfAnon}
              >
                <View>
                  <TextInput
                    style={styles.newInput}
                    value={this.state.newMessage}
                    onSubmitEditing={this.sendChat}
                    placeholder="Type your message here ..."
                    value={this.state.newMessage}
                    //onSubmitEditing={this.sendChat}
                    ref="newMessage"
                    //onFocus={this.inputFocused.bind(this, "newMessage")}
                    onBlur={() => {
                      //this.refs.scrollView.scrollTo(0, 0);
                    }}
                    onChangeText={newMessage => this.setState({ newMessage })}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  width: "10%"
                }}
                onPress={this.sendChat}
              >
                <View>
                  <Icon
                    name="send"
                    size={22}
                    color="white"
                    style={{
                      top: 20
                    }}
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = ({ routes, apiReducer: { channel, chats } }) => ({
  routes: routes,
  //token: token,
  channel: channel,
  chats: chats
});

const mapDispatchToProps = {
  //videoObject: fetchVideoObject
  loadChannelChats: fetchChannelChats,
  postMessage: sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
