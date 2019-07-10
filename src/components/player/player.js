import React, { Component } from "react";
import DialogInput from "react-native-dialog-input";
import NetInfo from "@react-native-community/netinfo";
import KeepAwake from 'react-native-keep-awake';


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


import CheckBox from "react-native-check-box";

import Messages from "./../messages";
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
    this._play1 = this._play1.bind(this);
    this._close = this._close.bind(this);

    //this.onLayout = this.onLayout.bind(this);
    this._onBack = this._onBack.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.decreaseQuality = this.decreaseQuality.bind(this);
    this.increaseQuality = this.increaseQuality.bind(this);
    this.hideQualityWarningForever = this.hideQualityWarningForever.bind(this);
    this.updateProgressBarOnData = this.updateProgressBarOnData.bind(this);
    this.hideCostWarningOnce = this.hideCostWarningOnce.bind(this)
    this.getMessagesWithAID = this.getMessagesWithAID.bind(this);
    this.timeout = this.timeout.bind(this);
    this.changeKeepAwake = this.changeKeepAwake.bind(this);


    this.state = {
      newMessage: "",
      isDialogVisible: false,
      progress: 0,
      indicatorLevel: 0,
      indeterminate: true,
      cost: 5,
      timer: null,
      id: "",
      totalRate: 0,
      totalCost: 0,
      currencySymbol: "",
      totalBitrate: 0,
      totalDataUsage: 0,
      progressText: "",
      step: 0,
      orientation: "",
      connectionType: "",
      bufferSize: 2000,
      indicatorLimit: 200,
      showOnce: 0,
      isChecked: false,
      hideWarning: false,
      checkWarningKey: "",
      hideCostWarning: true
    };

    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });

      this._player.close()
    });
  }



  costCounter(seconds) {
    this.cost * seconds;
  }

  clickProgressBar = () => {
    this.setState({
      step: this.state.step + 1
    });

    if (this.state.step === 2) {
      this.setState({
        step: 0
      });
    }

    this.updateProgressBarOnData();
  };

  async decreaseQuality() {
    var channelID = this.props.id;
    console.log(channelID)
    let AID = await AsyncStorage.getItem("aid");

    const down = {
      action: "down",
      aid: "aid=" + AID
    };

    setTimeout(() => {
      this.props.switchStream(channelID, down);
    }, 3000);
    
  }

  async increaseQuality() {
    
    var channelID = this.props.id;
    console.log(channelID)

    let AID = await AsyncStorage.getItem("aid");

    console.log(AID)
    const down = {
      action: "up",
      aid: "aid=" + AID
    };

    let value = await AsyncStorage.getItem("hideWarning");
    if (value !== null) {
      console.log("Don't Show Warning");
    } else if (this.state.connectionType !=='wifi'){

      this.setState({
        hideWarning: true
      });
    
    } else {
      console.log("Do Nothing")
    }

    this.props.switchStream(channelID, down);
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        return value;
      }
    } catch (error) {}
  };

  async loadUsername() {
    try {
      const username = await AsyncStorage.getItem("username");
      this.setState({ username: username });
    } catch (error) {
      // Manage error handling
    }
  }

  changeKeepAwake = (shouldBeAwake)  => {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  }

  async loadBufferSize() {
    try {
      const bufferSize = await AsyncStorage.getItem("bufferValue");
      var integer = parseInt(bufferSize);
      this.setState({ bufferSize: integer });
    } catch (error) {
      // Manage error handling
    }
  }

  async loadIndicatorLimit() {
    try {
      const indicatorLimit = await AsyncStorage.getItem("indicatorLimit");
      var integer = parseInt(indicatorLimit);
      this.setState({ indicatorLimit: integer });
    } catch (error) {
      // Manage error handling
    }
  }

  async getCurrencySymbol() {
    try {
      const currencySymbol = await AsyncStorage.getItem("currencySymbol");
      this.setState({ currencySymbol: currencySymbol });
    } catch (error) {
      // Manage error handling
    }
  }

  getOrientation = async () => {
    if (Dimensions.get("window").width < Dimensions.get("window").height) {
      this.setState({ orientation: "portrait" });
    } else {
      this.setState({ orientation: "landscape" });
    }
  };

  async componentWillUnmount(){
   // this.player.close()
   this._close();
  
    if (this.timeout) {
      //clearTimeout(this.timeout)
      await clearInterval(this.timeout);
      console.log("True")
    } else {
      await clearTimeout(this.timeout)
      //clearInterval(this.timeout);
    }
  }

  async componentDidMount() {
    NetInfo.getConnectionInfo().then(data => {
      this.setState({
        connectionType: data.type
      });
    });

    this.loadUsername();
    await this.loadBufferSize();
    await this.loadIndicatorLimit();
    //this.animate();
    await this.getOrientation();
    this.getCurrencySymbol();
    const channel = this.props.channel;
    console.log( "I need to Know" + JSON.stringify(this.props))


    Dimensions.addEventListener("change", () => {
      this.getOrientation();
    });

    await AsyncStorage.getItem("costPerMB").then(costPerMB => {
      this.setState({
        rate: costPerMB,
        totalDataUsage: 0
      });
    });

    await this.loadBufferSize();

    this.setState({ id: channel.id });

    

    await this.timeout();
  }

  timeout = () => {
    var intRate = totalBitrate * rate;
    console.log("This is the Current Rate: " + this.state.rate);
    var intTotalBitrate = parseFloat(totalBitrate);
    var totalCost = parseInt(intTotalBitrate);
    var VVV = totalCost * rate;
    var parsedTotalCoast = parseFloat(totalCost);

    const rate = this.state.rate;
    const totalRate = this.state.totalRate;

    setInterval(
      function() {
        // Do Something Here
        // Then recall the parent function to
        // create a recursive loop.
        const quality = this.props.qualityData;
        if (quality === "MEDIUM") {
          var midRange = [
            0.452,
            0.469,
            0.472,
            0.484,
            0.483,
            0.48,
            0.472,
            0.47,
            0.469,
            0.482,
            0.465,
            0.317
          ];
        } else if (quality === "LOW") {
          var midRange = [
            0.0552,
            0.0693,
            0.0673,
            0.0749,
            0.088,
            0.0876,
            0.0925,
            0.0776,
            0.071,
            0.0753,
            0.0816,
            0.0893
          ];
        } else if (quality === "HIGH") {
          var midRange = [
            0.904,
            0.83,
            1.1,
            1.12,
            0.95,
            0.948,
            0.942,
            0.957,
            0.939,
            0.904,
            0.889,
            0.86,
            0.833
          ];
        }

        var rand = midRange[Math.floor(Math.random() * midRange.length)];
        var maxRangeValue = Math.max.apply(Math, midRange);
        var maxRangeValuePercentage =
          parseFloat(rand) / parseFloat(maxRangeValue) - 0.1;

        totalBitrate += rand;
        var num = parseFloat(totalBitrate * rate).toFixed(2);

        var maxIndicatorValue = this.state.indicatorLimit;
        var totalDataUsage = this.state.totalDataUsage;
        var maxIndicatorLimitPercentage =
          parseFloat(totalDataUsage) / parseFloat(maxIndicatorValue);

        if (maxIndicatorLimitPercentage >= 1) {
          this.setState({
            indicatorLevel: 1
          });
        } else {
          this.setState({
            indicatorLevel: maxIndicatorLimitPercentage
          });
        }

        this.setState({
          totalCost: num,
          totalDataUsage: parseFloat(totalBitrate).toFixed(2),
          totalBitrate: rand * 1000,
          indeterminate: false,
          progress: maxRangeValuePercentage
        });

        //timeout();
      }.bind(this),
      1000
    );
  };

  updateProgressBarOnWifi = () => {
    switch (mMeasure) {
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
  };

  updateProgressBarOnData() {
    if (this.state.step === 0) {
      setTimeout(() => {
        this.setState({
          progressText: this.state.totalBitrate
        });
      }, 1000);
    } else if (this.state.step === 1 || this.state.connectionType === "wifi") {
      this.setState({
        progressText: this.state.totalDataUsage + "MB"
      });
    }
    else if (
      this.state.step === 1 &&
      this.state.connectionType !== "wifi" &&
      this.state.rate == "0"
    ) {
      this.setState({
        progressText:this.state.currencySymbol + this.state.totalDataUsage
      });
    } else if (this.state.step === 2) {
      this.setState({
        progressText: this.state.totalDataUsage + "MB"
      });
    }
  }

  async componentWillMount() {
   
      await this.getMessagesWithAID();

    
    await this.checkWarningPerferences();
  }



  async checkWarningPerferences() {
    var value = await AsyncStorage.getItem("hideWarning");
    console.log(value);
    if (value != null) {
      this.setState({
        hideWarning: false
      });
    }
  }

  async getMessagesWithAID() {
    let AID = await AsyncStorage.getItem("aid");
    let TOKENID = await AsyncStorage.getItem("sessionTokenID");

    const id = this.props.id;
  
     await this.props.loadChannelChats(id, AID, TOKENID);

  }

  _onBack = () => {
    Actions.pop();
    this._close()
  
  };

  checkIfAnon() {
    if (username === "" || username === "anonymous") {
      this.setState({
        isDialogVisible: true
      });
    }
  }

  sendInput(inputText) {
    AsyncStorage.setItem("username", inputText).then(token => {});
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

  hideQualityWarningForever = () => {
    console.log("Clicked Dismiss");
    this.setState({
      hideWarning: !this.state.hideWarning
    });

    if (this.state.isChecked === true) {
      console.log("Don't Show Anymore");
      AsyncStorage.setItem("hideWarning", "true");
      //this.setSta
    } else {
      console.log("Still Show");
    }
  };

  hideCostWarningOnce = () => {
    console.log("Clicked Dismiss");
    this.setState({
      hideCostWarning: !this.state.hideCostWarning
    });

  };

  async sendChat() {
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
        body: content,
        id:28
      };

      const channel = this.props.channel;
      var channelID = this.props.id;

      this.props.postMessage(channelID, opts, AID);
      this.setState({
        newMessage: ""
      });

      setTimeout(() => {
        this.getMessagesWithAID()   
      }, 1000);
      
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
    const { totalDataUsage } = this.state;
    const { bufferSize } = this.state;

    const rstp_link = this.props.link;
    const progressBarWidth = width * 0.84;
    const iconWidth = width * 0.08;
    const unfilledColorHex = "#000";
    const filledColorHex = "#0F516C";
    const iconPosition = width * (2 * 0.08 + width * 0.5);

    return (
      <View>
        {this.state.orientation === "landscape" ? (

            <VXGMobileSDK
            style={styles.player}
            ref={this._assignPlayer}
            config={{
              connectionUrl: rstp_link,
              autoplay: true
            }}
          />


        ) : null}
        {this.state.orientation === "portrait" ||
        this.state.orientation === "" ? (

          <VXGMobileSDK
            style={orientation.player}
            ref={this._assignPlayer}
            config={{
              connectionUrl: rstp_link,
              autoplay: true
            }}
          />

        ) : null}
        {this.state.orientation === "portrait" ? (
          <View style={styles.progressBarContainer}>
            <TouchableHighlight onPress={this.decreaseQuality}>
              <View
                style={{
                  width: iconWidth
                }}>
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
              }}>
              <TouchableHighlight onPress={this.clickProgressBar}>
                <View>
                  <Symbol
                    style={{
                      position: "absolute",
                      left: progressBarWidth / 2.15
                    }}
                    name="gesture-tap"
                    size={iconWidth}
                    color="white"
                  />
                  {this.state.step !== 2 && (
                    <Progress.Bar
                      style={{
                        position: "absolute",
                        zIndex: -1,
                        top: 0,
                        left: 0
                      }}
                      showsText={true}
                      color={filledColorHex}
                      borderWidth={1}
                      unfilledColor={unfilledColorHex}
                      progress={this.state.progress}
                      indeterminate={this.state.indeterminate}
                      width={progressBarWidth}
                      height={iconWidth}
                    />
                  )}

                  {this.state.step === 2 && (
                    <Progress.Bar
                      style={{
                        position: "absolute",
                        zIndex: -1,
                        top: 0,
                        left: 0
                      }}
                      showsText={true}
                      color={filledColorHex}
                      borderWidth={1}
                      unfilledColor={unfilledColorHex}
                      progress={this.state.indicatorLevel}
                      indeterminate={this.state.indeterminate}
                      width={progressBarWidth}
                      height={iconWidth}
                    />
                  )}
                  {this.state.step === 0 && (
                    <Text
                      style={{
                        color: "#fff",
                        paddingLeft: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center"
                      }}>
                      {totalBitrate} KB/S
                    </Text>
                  )}
                  {this.state.step === 1 &&
                    this.state.connectionType === "wifi" &&
                    (
                      <Text
                        style={{
                          color: "#fff",
                          paddingLeft: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center"
                        }}>
                       {totalDataUsage} MB
                      </Text>
                    )}
                  {this.state.step === 1 &&
                    this.state.connectionType !== "wifi" &&
                    this.state.rate === "0" && (
                      <Text
                        style={{
                          color: "#fff",
                          paddingLeft: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center"
                        }}>
                         -.--
                      </Text>
                    )}
                    {this.state.step === 1 &&
                    this.state.connectionType !== "wifi" && (
                      <Text
                        style={{
                          color: "#fff",
                          paddingLeft: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center"
                        }}>
                        {currencySymbol}{totalCost} 
                      </Text>
                    )}
                  {this.state.step === 2 &&
                    this.state.connectionType !== "wifi" && (
                      <Text
                        style={{
                          color: "#fff",
                          paddingLeft: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center"
                        }}>
                        {totalDataUsage} MB
                      </Text>
                    )}
                  {this.state.step === 2 &&
                    this.state.connectionType === "wifi" && (
                      <Text
                        style={{
                          color: "#fff",
                          paddingLeft: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center"
                        }}>
                        {totalDataUsage} MB
                      </Text>
                    )}
                </View>
              </TouchableHighlight>
            </View>
            <TouchableHighlight onPress={this.increaseQuality}>
              <View
                style={{
                  width: iconWidth
                }}>
                <Symbol
                  name="chevron-double-right"
                  size={iconWidth}
                  color="white"
                />
              </View>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
    );
  }

  _assignPlayer = plr => {
    this._player = plr;
  };

  async _play1() {
    const bufferValue = this.state.bufferSize;
    await this._player.close();
    await this._player.applyConfig({
      connectionUrl: rstp_link,
      autoplay: true,
      decodingType: 1, // Hardware – 1, Sofware – 0
      connectionNetworkProtocol: -1, // 0 - udp, 1 - tcp, 2 - http, 3 - https, -1 - AUTO
      numberOfCPUCores: 0, // 0<= - autodetect, > 0 - will set manually
      synchroEnable: 1, // Enable A/V synchronization, 1 - synchronization is on, 0 - is off
      connectionBufferingTime: bufferValue,
      connectionDetectionTime: bufferValue,
      aspectRatioMode: 1 // 0 - stretch, 1 - fit to screen with aspect ratio, 2 - crop, 3 - 100% size, 4 - zoom mode, 5 - move mode)
    });
    await this._player.open();
  }

  async _close() {
    //const bufferValue = this.state.bufferSize;
    await this._player.close();
    console.log("Ran Close")
    //await this._player.open();
  }

  render() {
    const { totalCost } = this.state;

    if (this.props == "undefined") {
      return <View />;
    } else {
      return (
        <View style={styles.container}>
{/*           {this.state.orientation === "portrait" ||
        this.state.orientation === "" ? ( <View>{this.renderVideo()}</View>
          ) : null}
          {this.state.orientation !== "portrait" ||
        this.state.orientation !== ""? ( <View>{this.renderVideo()}</View>
          ) : null} */}
          <View>{this.renderVideo()}</View>
          {this.state.orientation === "portrait" ? (
            <TouchableHighlight onPress={this._onBack}>
              <View style={styles.buttonText}>
                <Icon name="close" size={42} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold"
                  }}>
                  Close
                </Text>
                <KeepAwake />
              </View>
            </TouchableHighlight>
          ) : null}
          {this.state.orientation === "portrait" ? (
            <ScrollView>
              <View>
                <View style={styles.messagesContainer}>
                  {this.state.hideCostWarning==true && this.state.step === 1 &&
                    this.state.connectionType === "!wifi" &&
                    this.state.rate === "0" && (
                      <View>
                        <Text
                          style={{
                            paddingRight: 2,
                            fontWeight: "bold",
                            fontSize: 12,
                            alignSelf: "center"
                          }}>
                          Set Data Cost(per MB) to show data cost
                        </Text>
                        <TouchableHighlight
                          onPress={this.hideCostWarningOnce}>
                          <View>
                            <Text
                              style={{
                                paddingRight: 2,
                                fontSize: 16,
                                alignSelf: "flex-end"
                              }}>
                              Dismiss
                            </Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    )}
                  {this.state.hideWarning !== false && (
                    <View>
                      <Text
                        style={{
                          paddingRight: 2,
                          fontWeight: "bold",
                          fontSize: 16,
                          alignSelf: "center"
                        }}>
                        Higher quality may incur higher data costs
                      </Text>
                      <CheckBox
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => {
                          console.log("CCCCCC");
                          this.setState({
                            isChecked: !this.state.isChecked
                          });
                        }}
                        isChecked={this.state.isChecked}
                        leftText={"Don't Show Again"}
                      />
                      <TouchableHighlight
                        onPress={this.hideQualityWarningForever} >
                        <View>
                          <Text
                            style={{
                              paddingRight: 2,
                              fontSize: 16,
                              alignSelf: "flex-end"
                            }}>
                            Dismiss
                          </Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  )}
                 
                </View>
                <View>
                  <DialogInput
                    isDialogVisible={this.state.isDialogVisible}
                    title={"Set Username"}
                    submitInput={inputText => {
                      this.sendInput(inputText);
                    }}
                    closeDialog={() => {
                      this.showDialog(false);
                    }}
                  />
                </View>
              </View>
              <Messages />
            </ScrollView>
            
          ) : null}
          {this.state.orientation === "portrait" ? (
            <View style={styles.passwordContainer}>
              <View style={{ width: "100%", flexDirection: "row" }}>
                <TouchableHighlight
                  style={{
                    width: "90%"
                  }}
                  onPress={this.checkIfAnon} >
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
                  onPress={this.sendChat}>
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
          ) : null}
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

const orientation = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: "stretch"
  },
  player: {
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 250
  }
});
