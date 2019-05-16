import React, { Component } from 'react';
import { View, Alert, Image, Button,  TouchableHighlight, Text } from 'react-native';
import { WebView } from 'react-native-webview';

import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../../components/loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { loginUser, restoreSession, loginAnonymously, apiRegisterUser } from '../../../actions/session/actions';
const PRIVACY_POLICY = require('../../../../assets/html/privacy-policy.html');
import { AsyncStorage } from "react-native";

import LinearGradient from 'react-native-linear-gradient';
//import { TouchableHighlight } from 'react-native-gesture-handler';

const NILEMEDIA_LOGO = require('../../../../assets/icons/nilemedia.png');

class LoginFormComponent extends Component {
  componentDidMount() {
    this.props.restore();
    console.log(JSON.stringify(this.props))
    this.props.registerAID();
  }

  componentDidUpdate(prevProps) {
    const { error, logged , loginAnonymously} = this.props;

    if (!prevProps.error && error) Alert.alert('error', error);
    console.log("Logged: " +logged)
    if (logged) {Actions.reset('media')}
  
  }

  render() {
    const { login, loading, loginAnon } = this.props;
    const { scrollView, imageBox, image, loginBox, actionButton} = styles;
    return (
      <LinearGradient  colors={['#76B6C4', '#4E8FA2', '#0F516C']}
      style={{ borderRadius: 5 , height: '100%'}}>
      <KeyboardAwareScrollView style={scrollView}>
        <View style={imageBox}>
          <Image style={image} source={NILEMEDIA_LOGO} />
        </View>
        <View style={loginBox}>
          {loading ? (
            <View>
              <LoadingIndicator color="#ffffff" size="large" />
            </View>
            
          ) : (
            <View>
            <TouchableHighlight>
                <Button
                  style={{
                    top: 10,
                    fontWeight: 'bold',
                    fontSize: 21
                  }}
                  onPress={loginAnon} 
                  title="Get Started" 
                  color="#fff"
                />
            </TouchableHighlight>
            <View 
            style={{
              width:'100%',
              height:'90%'
            }}>
              <WebView 
               source={PRIVACY_POLICY}
              />
              
            </View>
            <View>
            <TouchableHighlight>
                
                <Button
                 style={{
                  top: 10,
                  fontWeight: 'bold',
                  fontSize: 21
                }}
                  onPress={loginAnon} 
                  title="Continue" 
                  color="#fff"
                />
            </TouchableHighlight>
            </View>
            </View>
            
          )}
        </View>
      </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { restoring, loading, user, error, logged , aid} }) => ({
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
  registerAID: apiRegisterUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
