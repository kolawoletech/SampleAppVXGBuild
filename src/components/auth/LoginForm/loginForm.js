import React, { Component } from 'react';
import { View, Alert, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../../components/loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { loginUser, restoreSession } from '../../../actions/session/actions';
//import {  LinearGradient } from 'expo';


const NILEMEDIA_LOGO = require('../../../../assets/icons/nilemedia.png');

class LoginFormComponent extends Component {
  componentDidMount() {
    this.props.restore();
  }

  componentDidUpdate(prevProps) {
    const { error, logged } = this.props;

    if (!prevProps.error && error) Alert.alert('error', error);

    if (logged) Actions.reset('channels');
  }

  render() {
    const { login, loading } = this.props;
    const { scrollView, imageBox, image, loginBox, actionButton} = styles;
    return (
/*       <LinearGradient  colors={['#76B6C4', '#4E8FA2', '#0F516C']}
      style={{ borderRadius: 5 , height: '100%'}}> */
      <KeyboardAwareScrollView style={scrollView}>
        <View style={imageBox}>
          <Image style={image} source={NILEMEDIA_LOGO} />
        </View>
        <View style={loginBox}>
          {loading ? (
            <LoadingIndicator color="#ffffff" size="large" />
          ) : (
            <BasicFormComponent buttonTitle={'login'}  onButtonPress={login} />
          )}
        </View>
        <View style={actionButton}>{loading ? null : <Button  onPress={Actions.signup} color="#fff" title="Don't Have an Account? Register Here" />}</View>
      </KeyboardAwareScrollView>
/*       </LinearGradient>
 */    );
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
  restore: restoreSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
