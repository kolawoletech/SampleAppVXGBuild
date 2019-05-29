import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  Switch
} from "react-native";
import DialogInput from "react-native-dialog-input";

import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { fetchPlaylist, getUID } from "../../actions/playlist/actions";
import {
  logoutUser,
  getWiFiSettingsOption
} from "../../actions/session/actions";
import { SettingsScreen } from "react-native-settings-screen";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { ConnectableObservable } from "rx";

export class Settings extends Component {
  state = {
    refreshing: false,
    username: "anonymous",
    costPerMB: "",
    currencySymbol: "",
    bufferValue: "",
    indicatorLimit:""
  };

  openDataCostDialog = () => {
    this.setState({
      isDataCostDialogVisible: true
    });
  };

  openCurrencySymbolDialog = () => {
    this.setState({
      isCurrencyDialogVisible: true
    });
  };

  openIndicatorLimitDialog = () => {
    this.setState({
      isIndicatorLimitDialogVisible: true
    });
  };

  openBufferValueDialog = () => {
    this.setState({
      isBufferDialogVisible: true
    });
  };

  showDialog(isShow) {
    this.setState({ isDataCostDialogVisible: isShow });
    this.setState({ isCurrencyDialogVisible: isShow });
  }

  setDataCostPerMB = async (costPerMB) => {
    console.log(costPerMB);

    this.setState({
      isDataCostDialogVisible: false
    });

    try {
      await AsyncStorage.setItem("costPerMB", costPerMB);
    } catch (error) {
      // Error saving data
    }

    Actions.settings();
  };

  setCurrencySymbol = async (currencySymbol) => {
    console.log(currencySymbol);
    this.setState({
      isCurrencyDialogVisible: false
    });

    try {
      await AsyncStorage.setItem("currencySymbol", currencySymbol);
    } catch (error) {

    }
    Actions.settings();
  };

  setBufferValue = async (bufferValue) => {
    console.log(bufferValue);
    this.setState({
      isBufferDialogVisible: false
    });

    try {
      await AsyncStorage.setItem("bufferValue", bufferValue);
    } catch (error) {

    }
    Actions.settings();
  };


  setIndicatorLimit = async (indicatorLimit) => {
    console.log(indicatorLimit);
    this.setState({
      isIndicatorLimitDialogVisible: false
    });

    try {
      await AsyncStorage.setItem("indicatorLimit", indicatorLimit);
    } catch (error) {

    }
    Actions.settings();
  };

  _setUsernameOnLoad = async () => {
    try {
      await AsyncStorage.setItem("username", "anonymous");
    } catch (error) {
      // Error saving data
    }
  };

  _getDownloadOverWifiOnly = async () => {
    let value = await AsyncStorage.getItem("wifiBoolValue");
    var boolValue = value == "true" || value == "false";

    console.log("RUNING  _getDownloadOverWifiOnly")
    if (value != null ){
      console.log("Getting Value and Updating check box")

      this.setState({
        isChecked: boolValue
      });
    } else {
      console.log("SOmething is off")
    }

  };

  _setDownloadOverWifiOnly = async () => {
    try {
      this.setState({
        isChecked: !this.state.isChecked
      });
      
      var status = this.state.isChecked;
      var boolValueToString = status.toString();

      AsyncStorage.setItem("wifiBoolValue", boolValueToString).then(
        setValue => {
          console.log(setValue);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  _setDataUsageIndicator = async () => {
    try {
      this.setState({
        isChecked: this.state.isChecked
      });

      //this.props.getWiFiOption(this.state.isChecked);
      var status = this.state.isChecked;
      var boolValueToString = status.toString();

      AsyncStorage.setItem("wifiBoolValue", boolValueToString).then(
        setValue => {
          console.log(setValue);
        }
      );
    } catch (error) {
      // Error saving data
      console.log(err);
    }
  };

  async componentDidMount() {
    //console.log(this.props.getWiFiOption())
    const getUserId = async () => {
      let userId = "";
      try {
        userId = (await AsyncStorage.getItem("wifi")) || "none";
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      return userId;
    };

    await this._getDownloadOverWifiOnly();

    this.loadUsername();

    this.loadCurrencySymbol();

    this.loadCostPerMB()

    await this.loadIndicatorLimit()

    await this.loadBufferSize()
  }

  async loadUsername() {
    try {
      const username = await AsyncStorage.getItem("username");
      this.setState({ username: username });
    } catch (error) {
      // Manage error handling
    }
  }



  async loadCurrencySymbol() {
    try {
      const currencySymbol = await AsyncStorage.getItem("currencySymbol");

      if (currencySymbol == null) {
        this.setState({ currencySymbol:"Not Set" });
      }
      this.setState({ currencySymbol: currencySymbol });
    } catch (error) {
      // Manage error handling
    }
  }

  async loadIndicatorLimit() {
    try {
      const indicatorLimit = await AsyncStorage.getItem("indicatorLimit");

      if (indicatorLimit == null) {
        this.setState({ indicatorLimit:"Not Set" });
      }
      this.setState({ indicatorLimit: indicatorLimit });
    } catch (error) {
      // Manage error handling
    }
  }

  async loadBufferSize() {
    try {
      const bufferValue = await AsyncStorage.getItem("bufferValue");

      if (bufferValue == null) {
        this.setState({ bufferValue:"Not Set" });
      }
      this.setState({ bufferValue: bufferValue });
    } catch (error) {
      // Manage error handling
    }
  }

  async loadCostPerMB() {
    try {
      const costPerMB = await AsyncStorage.getItem("costPerMB");

      if (costPerMB  === 'null') {
        this.setState({ costPerMB:"Not Set" });

      }
      this.setState({ costPerMB: costPerMB });
    } catch (error) {
      // Manage error handling 
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      isDataCostDialogVisible: false,
      isCurrencyDialogVisible: false,
      isBufferDialogVisible: false,
      isIndicatorLimitDialogVisible: false,
    };
  }

  handler() {
    this.setState({
      uri: "",
      user: ""
    });
  }

  render() {
    const { username, currencySymbol, costPerMB, bufferValue, indicatorLimit} = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 45
          }}>
          <Text style={styles.title}>Version</Text>
          <Text style={styles.entry}>1.0.16</Text>
        </View>
        <View
          style={{
            height: 45
          }}>
          <Text style={styles.title}>Username</Text>
          <Text style={styles.entry}>{username}</Text>
        </View>
        <View
          style={{
            flex: 1
          }}>
          <View
            style={{
              height: 45,
              flexDirection: "row"
            }}>
            <Text style={styles.title}>Download over Wi-Fi only</Text>
            <CheckBox  
              title="Click Here"
              isChecked={this.state.isChecked} //Get State From Props
              leftText={" "}
              checkBoxColor="#fff"
              checkedCheckBoxColor="#76B6C4"
              onClick={() => {
                this._setDownloadOverWifiOnly();
              }}
            />
          </View>
          {/* <View 
            style={{
              flexDirection:'row'
            }}>
            <Text  style={styles.title}>Data Usage Indicator</Text>
            <CheckBox 
                style={{ flex: 1 }}
                title="Click Here" 
                isChecked={this.state.isChecked}//Get State From Props
                leftText={" "}
                checkBoxColor="#fff"
                checkedCheckBoxColor="#76B6C4"
                onClick={() => {
                  this._setDataUsageIndicator()
                }}
            />
          </View> */}
          <TouchableHighlight onPress={this.openCurrencySymbolDialog}>
            <View
              style={{
                height: 45
              }}>
              <Text style={styles.title}>Currency Symbol</Text>
              <Text style={styles.entry}>{currencySymbol}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.openDataCostDialog}>
            <View
              style={{
                height: 45
              }}>
              <Text style={styles.title}>Data Cost (per MB)</Text>
              <Text style={styles.entry}>{costPerMB}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.openBufferValueDialog}>
            <View
              style={{
                height: 45
              }}>
              <Text style={styles.title}>Buffer size (ms)</Text>
              <Text style={styles.entry}>{bufferValue}</Text>

            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.openIndicatorLimitDialog}>
            <View
              style={{
                height: 45
              }}>
              <Text style={styles.title}>Indicator Limit (MB)</Text>
              <Text style={styles.entry}>{indicatorLimit}</Text>

            </View>
          </TouchableHighlight>
          <View>
            <DialogInput
              isDialogVisible={this.state.isDataCostDialogVisible}
              title={"Data cost(per MB)"}
              //message={"Message for DialogInput #1"}
              keyboardType='numeric'
              hintInput ={"Enter A Number"}
              submitInput={inputText => {
                this.setDataCostPerMB(inputText);
              }}
              textInputProps={{autoCorrect:false, keyboardType : 'numeric'}}

              closeDialog={() => {
                this.showDialog(false);
              }}
            />
          </View>
          <View>
            <DialogInput
              isDialogVisible={this.state.isCurrencyDialogVisible}
              title={"Set Currency Symbol"}
              //message={"Message for DialogInput #1"}
              textInputProps={{autoCorrect:false, keyboardType : 'default'}}
              hintInput ={"Enter A Symbol"}
              submitInput={inputText => {
                this.setCurrencySymbol(inputText);
              }}
              closeDialog={() => {
                this.showDialog(false);
              }}
            />
          </View>
          <View>
            <DialogInput
              isDialogVisible={this.state.isBufferDialogVisible}
              title={"Set Buffer Size"}
              //message={"Message for DialogInput #1"}
              textInputProps={{autoCorrect:false, keyboardType : 'numeric'}}
              hintInput ={"Enter A Buffer Value"}
              submitInput={inputText => {
                this.setBufferValue(inputText);
              }}
              closeDialog={() => {
                this.showDialog(false);
              }}
            />
          </View>
          <View>
            <DialogInput
              isDialogVisible={this.state.isIndicatorLimitDialogVisible}
              title={"Set Indicator Limit"}
              //message={"Message for DialogInput #1"}
              textInputProps={{autoCorrect:false, keyboardType : 'numeric'}}
              hintInput ={"Set Indicator Limit"}
              submitInput={inputText => {
                this.setIndicatorLimit(inputText);
              }}
              closeDialog={() => {
                this.showDialog(false);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  routes,
  playlistReducer: { items },
  sessionReducer: { user, wifi }
}) => ({
  routes: routes,
  //user: user,
  items: items,
  user: user,
  wifi: wifi
});

const mapDispatchToProps = {
  playlist: fetchPlaylist,
  userId: getUID,
  logout: logoutUser,
  getWiFiOption: getWiFiSettingsOption
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
