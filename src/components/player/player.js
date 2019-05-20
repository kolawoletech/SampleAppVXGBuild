import React, { Component } from "react";
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
import { connect } from "react-redux";
import { VXGMobileSDK } from "react-native-vxg-mobile-sdk";
import Icon from "react-native-vector-icons/MaterialIcons";
import Symbol from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
const { width, height } = Dimensions.get("window");
import { AsyncStorage } from "react-native";

import Messages from "./../messages";
var data = require("./data.json");
var totalBitrate = 0;
import {
  fetchChannelChats,
  sendMessage,
  switchQuality
} from "../../actions/api/actions";

export class Player extends React.Component {
  _url = null;
  _player = null;

  constructor() {
    super();
    this._onBack = this._onBack.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.decreaseQuality = this.decreaseQuality.bind(this);
    this.increaseQuality = this.increaseQuality.bind(this);

    this.state = {
      newMessage: "",
      isDialogVisible: false,
      progress: 0,
      indeterminate: true,
      cost: 5,
      timer: null,
      id: "",
      totalRate: 0,
      totalCost: 0,
      curremncySymbol: "",
      totalBitrate:0,
      totalDataUsage:0
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

  costCounter(seconds) {
    this.cost * seconds;
  }

  clickProgressBar() {
    console.log("Progress Bar Clicked");
  }

  async decreaseQuality() {
    var channelID = this.state.id;
    let AID = await AsyncStorage.getItem("aid");

    const down = {
      action: "down",
      aid: "aid=" + AID
    };

    this.props.switchStream(channelID, down);
  }

  async increaseQuality() {
    var channelID = this.state.id;
    let AID = await AsyncStorage.getItem("aid");

    const down = {
      action: "up",
      aid: "aid=" + AID
    };

    console.log(AID);

    this.props.switchStream(channelID, down);
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

  async getCurrencySymbol() {
    try {
      const currencySymbol = await AsyncStorage.getItem("currencySymbol");
      this.setState({ currencySymbol: currencySymbol });

      console.log("This is this curremncySymbol" + this.state.currencySymbol);
    } catch (error) {
      // Manage error handling
    }
  }

  async componentDidMount() {
    this.loadUsername();
    this.animate();
    this.getCurrencySymbol();
    const channel = this.props.channel;

    await AsyncStorage.getItem("costPerMB").then(costPerMB => {
      this.setState({
        rate: costPerMB
      });
    });
    this.setState({ id: channel.id });

    timeout = () => {
      var intRate = totalBitrate * rate;
      var intTotalBitrate = parseFloat(totalBitrate);
      var totalCost = parseInt(intTotalBitrate);
      var VVV = totalCost * rate;
      var parsedTotalCoast = parseFloat(totalCost);

      const rate = this.state.rate;
      const totalRate = this.state.totalRate;

      console.log(
        parseInt(rate * totalBitrate, 10) + "  " + this.state.totalCost
      );

      setTimeout(
        function() {
          // Do Something Here
          // Then recall the parent function to
          // create a recursive loop.

          var myArray = [5, 19, 4];
          var lowRange = [26, 30, 34, 38, 46, 54, 64];
          var midRange = [0.14, 0.16, 0.19, 0.22, 0.28, 0.34, 0.4];
          var HighRange = [500, 750, 1000, 1250];

          var rand = midRange[Math.floor(Math.random() * midRange.length)];

          totalBitrate += rand;
          var num = parseFloat(totalBitrate * rate).toFixed(2);

          console.log("TRhis is Total" + num);

          this.setState({
            totalCost: num,
            totalDataUsage: parseFloat(totalBitrate).toFixed(2),
            totalBitrate: rand*1000
          });

          timeout();
        }.bind(this),
        1000
      );
    };

    timeout();
    //this.props.loadChannelChats(channel.id);
    await this.getMessagesWithAID();
  }

  updateProgressBarOnWifi = () => {
    switch(mMeasure) {
      case "total":
        text = "Banana is good!";
        break;
      case "cost":
        text = "I am not a fan of orange.";
        break;
      case "average":
        text = "How you like them apples?";
        break;
      default:
        text = "I have never heard of that fruit...";
    }
  }

  updateProgressBarOnData = () => {
    switch(mMeasure) {
      case "total":
        text = "Banana is good!";
        break;
      case "Orange":
        text = "I am not a fan of orange.";
        break;
      case "Apple":
        text = "How you like them apples?";
        break;
      default:
        text = "I have never heard of that fruit...";
    }
  }

  async getMessagesWithAID() {
    let AID = await AsyncStorage.getItem("aid");
    //this.props.registerWithAID(AID)
    const channel = this.props.channel;
    setTimeout(() => {
      this.props.loadChannelChats(channel.id, AID);
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
      const updatedUsername = AsyncStorage.getItem("username");

      this.setState({
        username: updatedUsername
      });
    }, 3000);
  }

  showDialog = () => {
    this.setState({
      isDialogVisible: false
    });
  };

  async sendChat() {
    console.log("Sending: " + JSON.stringify(this.state.newMessage));
    console.log("Send To API");
    let AID = await AsyncStorage.getItem("aid");

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

      this.props.postMessage(channel.id, opts, AID);
      this.setState({
        newMessage: ""
      });
    }
  }

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
    const { totalCost } = this.state;
    const { currencySymbol } = this.state;
    const { totalBitrate } = this.state;
    const { totalDataUsage } = this.state


    const rstp_link = this.props.link;
    const progressBarWidth = width * 0.84;
    const iconWidth = width * 0.08;
    const unfilledColorHex = "#000";
    const filledColorHex = "#0F516C";
    const iconPosition = width * (2 * 0.08 + width * 0.5);

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
          <TouchableHighlight onPress={this.decreaseQuality}>
            <View
              style={{
                width: iconWidth
              }}
            >
              <Symbol
                name="chevron-double-left"
                size={iconWidth}
                color="white"
              />
            </View>
          </TouchableHighlight>

          <View
            style={{
              width: progressBarWidth,
              position: "relative"
            }}
          >
            <Symbol
              style={{
                position: "absolute",

                zIndex: 1000,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                left: iconPosition
              }}
              name="gesture-tap"
              size={iconWidth}
              color="white"
            />
            <TouchableHighlight onPress={this.clickProgressBar}>
              <View>
                <Progress.Bar
                  style={{
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0
                  }}
                  text="Wassup"
                  showsText={true}
                  color={filledColorHex}
                  borderWidth={1}
                  unfilledColor={unfilledColorHex}
                  progress={this.state.progress}
                  indeterminate={this.state.indeterminate}
                  width={progressBarWidth}
                  height={iconWidth}
                />
                <Text
                  style={{
                    color: "#fff",
                    paddingLeft: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center"
                  }}>
                  {currencySymbol} {totalCost} { totalBitrate } KB/S { totalDataUsage } MB
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <TouchableHighlight onPress={this.increaseQuality}>
            <View
              style={{
                width: iconWidth
              }}
            >
              <Symbol
                name="chevron-double-right"
                size={iconWidth}
                color="white"
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _assignPlayer = plr => {
    this._player = plr;
  };

  async _play1() {
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
    const { totalCost } = this.state;

    console.log("Total Cost:  " + this.state.totalCost);

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
)(Player);
