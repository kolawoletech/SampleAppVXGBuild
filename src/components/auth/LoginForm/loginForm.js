import React, { Component } from "react";
import {
  View,
  Alert,
  Image,
  Button,
  TouchableHighlight,
  Text
} from "react-native";
import { WebView } from "react-native-webview";

import { connect } from "react-redux";
import { BasicFormComponent } from "../BasicForm/basicForm";
import { LoadingIndicator } from "../../../components/loadingIndicator/loadingIndicator";
import { styles } from "../BasicForm/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import {
  loginUser,
  restoreSession,
  loginAnonymously,
  apiRegisterUser,
  setSessionToken
} from "../../../actions/session/actions";
const PRIVACY_POLICY = require("../../../../assets/html/privacy-policy.html");
import { AsyncStorage } from "react-native";

import LinearGradient from "react-native-linear-gradient";

const NILEMEDIA_LOGO = require("../../../../assets/icons/nilemedia.png");

class LoginFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrivacyPolicy: false,
      showContinue: false,
      launch: false
    };
  }
  async componentWillMount() {
    //await this.props.restore();
    await this.checkUserAID().then(async () => {});
  }

  async componentDidMount() {
    setTimeout(async () => {
      await this.getNewToken();
      //TODO Landing Page
      //Actions.catalogue()
    }, 2000);
  }

  async getNewToken() {
    var aid = await AsyncStorage.getItem("aid");
    try {
      await this.props.setToken(aid);
      let value = await AsyncStorage.getItem("sessionTokenID");
    } catch (error) {}
  }

  goToCatalogue() {
    Actions.categories();
  }
  async checkUserAID() {
    try {
      let value = await AsyncStorage.getItem("aid");

      if (value !== null) {
        console.log("This is a not a new user");

        this.setState({
          launch: true
        });

        if (this.state.launch === true) {
          this.goToCatalogue();
        }
      } else {
        console.log("This is a new user");
        this.setState({
          showPrivacyPolicy: true
        });
        await this.props.registerAID().then(result => {
          this.setState({
            showContinue: true
          });
        });
      }
    } catch (error) {}
  }

  render() {
    const { login, loading, loginAnon } = this.props;
    const { scrollView, imageBox, image, loginBox, actionButton } = styles;
    return (
      <LinearGradient
        colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
        style={{ borderRadius: 5, height: "100%" }}
      >
        <View style={imageBox}>
          <Image style={image} source={NILEMEDIA_LOGO} resizeMode="contain" />
        </View>
        <View>
          {this.state.showPrivacyPolicy !== true ? (
            <View style={loginBox}>
              <LoadingIndicator color="#ffffff" size="large" />
            </View>
          ) : (
            <View>
              <TouchableHighlight>
                <Button
                  style={{
                    top: 1,
                    fontWeight: "bold",
                    fontSize: 21
                  }}
                  onPress={loginAnon}
                  title="Continue"
                  color="#fff"
                />
              </TouchableHighlight>

              <View />
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = ({
  routes,
  sessionReducer: { restoring, loading, user, error, logged, aid }
}) => ({
  routes: routes,
  restoring: restoring,
  loading: loading,
  user: user,
  error: error,
  logged: logged,
  aid: aid
});

const mapDispatchToProps = {
  login: loginUser,
  loginAnon: loginAnonymously,
  restore: restoreSession,
  registerAID: apiRegisterUser,
  setToken: setSessionToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
