import React, { Component } from 'react';
import { View, Alert, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../../components/loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { loginUser, restoreSession, loginAnonymously } from '../../../actions/session/actions';

import LinearGradient from 'react-native-linear-gradient';

const NILEMEDIA_LOGO = require('../../../../assets/icons/nilemedia.png');

class LoginFormComponent extends Component {
  componentDidMount() {
    this.props.restore();
    console.log(JSON.stringify(this.props))
  }

  componentDidUpdate(prevProps) {
    const { error, logged , loginAnonymously} = this.props;

    if (!prevProps.error && error) Alert.alert('error', error);

    if (logged) Actions.reset('channels');
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
            <LoadingIndicator color="#ffffff" size="large" />
          ) : (
            <TouchableOpacity>
                
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
            </TouchableOpacity>
            
          )}
        </View>
      </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { restoring, loading, user, error, logged } }) => ({
  routes: routes,
  restoring: restoring,
  loading: loading,
  user: user,
  error: error,
  logged: logged
});

const mapDispatchToProps = {
  login: loginUser,
  loginAnon: loginAnonymously,
  restore: restoreSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
