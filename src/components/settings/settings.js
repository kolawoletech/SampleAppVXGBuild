import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Switch
} from "react-native";

import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { fetchPlaylist, getUID } from "../../actions/playlist/actions";
import { logoutUser, getWiFiSettingsOption } from "../../actions/session/actions";
import { SettingsScreen } from "react-native-settings-screen";
import { AsyncStorage } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

export class Settings extends Component {
  state = {
    refreshing: false,
    username: "anonymous"
  };

  _setUsernameOnLoad = async () => {
    try {
      await AsyncStorage.setItem("username", "anonymous");
    } catch (error) {
      // Error saving data
    }
  };

  _getDownloadOverWifiOnly = async () => {
    let value = await AsyncStorage.getItem("wifiBoolValue")
    var boolValue = (value == "true" || value == "false")

    this.setState({
      isChecked: boolValue
    });
  }
  
  _setDownloadOverWifiOnly = async () => {
    try {
      this.setState({
        isChecked: this.state.isChecked
      });
      
      //this.props.getWiFiOption(this.state.isChecked);
      var status = this.state.isChecked
      var  boolValueToString = status.toString()

      AsyncStorage.setItem("wifiBoolValue",boolValueToString).then( setValue => {
        console.log(setValue)
      });
    } catch (error) {
      // Error saving data
      console.log(err)
    }   
  }

  componentDidMount() {
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

    this._getDownloadOverWifiOnly()

    this.loadUsername();
  }

  async loadUsername() {
    try {
      const username = await AsyncStorage.getItem("username");
      this.setState({ username: username });
    } catch (error) {
      // Manage error handling
    }
  }

  constructor(props) {
    super(props);
  }

  handler() {
    this.setState({
      uri: "",
      user: ""
    });
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Version</Text>
          <Text style={styles.entry}>1.0.5</Text>
        </View>
        <View>
          <Text style={styles.title}>Username</Text>
          <Text style={styles.entry}>{username}</Text>
         
 
        </View>
        <View>
          <View
            style={{
              flexDirection:'row'
            }}>
            <Text  style={styles.title}>Download over Wi-Fi only</Text>
            <CheckBox 
                style={{ flex: 1 }}
                title="Click Here" 
                isChecked={this.state.isChecked}//Get State From Props
                leftText={" "}
                checkBoxColor="#fff"
                checkedCheckBoxColor="#76B6C4"
                onClick={() => {
                  this._setDownloadOverWifiOnly()
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
