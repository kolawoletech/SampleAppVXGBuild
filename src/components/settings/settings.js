import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchPlaylist, getUID } from '../../actions/playlist/actions';
import { logoutUser } from '../../actions/session/actions';

import { ScrollView } from 'react-native-gesture-handler';




class Settings extends Component {
    constructor(props) {
        super(props)
    }

    handler() {
        this.setState({
            uri: ''
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Settings</Text>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ routes, playlistReducer: { items }, sessionReducer: { user } }) => ({
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