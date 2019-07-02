import React, { Component } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { logoutUser } from '../../actions/session/actions';
//import {  LinearGradient } from 'expo';


class Home extends Component {
  logout = () => {
    this.props.logout();
    setTimeout(() => {
      //Actions.reset('login');
    }, 100);
  };


  render() {
    const { container, marginBox, title } = styles;
    const {
      user: { email }
    } = this.props;
    return (
      <View style={container}>
       {/* <LinearGradient  colors={['#4c669f', '#3b5998', '#192f6a']}>  */}
        <View style={marginBox}>
          <Button onPress={this.logout} title="Logout" />
        </View>

        <View>
          <Text style={title}>User: {email}</Text>
          <Button onPress={Actions.channels} title="Go to Search" />
          <Button onPress={Actions.todolist} title="Start To-Do List" />
          
        </View>

        {/* </LinearGradient> */}
      </View>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer }) => ({
  routes: routes,
  user: sessionReducer.user
});



const mapDispatchToProps = {
  logout: logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
