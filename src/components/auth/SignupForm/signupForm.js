import React, { Component } from 'react';
import { View, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { signupUser } from '../../../actions/session/actions';
//import {  LinearGradient } from 'expo';

const NILEMEDIA_LOGO = require('../../../../assets/icons/nilemedia.png');

class SignupFormComponent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.registered) {}
  }

  render() {
    const { signup, loading } = this.props;
    const { scrollView, imageBox, image, loginBox } = styles;
    return (
/*        <LinearGradient  colors={['#76B6C4', '#4E8FA2', '#0F516C']}
      style={{ borderRadius: 5 , height: '100%'}}> */
      <KeyboardAwareScrollView style={scrollView}>
     
        <View style={imageBox}>
          <Image style={image} source={NILEMEDIA_LOGO} />
        </View>
        <View style={loginBox}>
          {loading ? (
            <LoadingIndicator color="#0F516C" size="large" />
          ) : (
            <BasicFormComponent buttonTitle={'signup'} onButtonPress={signup} />
          )}
        </View>
        
      </KeyboardAwareScrollView>
/*       </LinearGradient>
 */    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { loading, error, registered } }) => ({
  routes: routes,
  loading: loading,
  error: error,
  registered: registered
});

const mapDispatchToProps = {
  signup: signupUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupFormComponent);
