import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { fetchPlaylist, getUID } from "../../actions/playlist/actions";
import { logoutUser } from "../../actions/session/actions";
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

  componentDidMount() {
    const getUserId = async () => {
      let userId = "";
      try {
        userId = (await AsyncStorage.getItem("userId")) || "none";
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      return userId;
    };

    AsyncStorage.getItem("username").then(result => {
      console.log(result);
    });

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
    console.log("HIHIHIHIHIHIHUI");
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
          <Text style={styles.entry}>1.0.1</Text>
        </View>
        <View>
          <Text style={styles.title}>Username</Text>
          <Text style={styles.entry}>{username}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  routes,
  playlistReducer: { items },
  sessionReducer: { user }
}) => ({
  routes: routes,
  //user: user,
  items: items,
  user: user
});

const mapDispatchToProps = {
  playlist: fetchPlaylist,
  userId: getUID,
  logout: logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
