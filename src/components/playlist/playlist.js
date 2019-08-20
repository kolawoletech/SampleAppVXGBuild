import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchPlaylist, getUID } from '../../actions/playlist/actions';
import { logoutUser } from '../../actions/session/actions';
import _ from "lodash";
import { PlaylistItems } from "./playlistItems";
//import { Video } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';



class Playlist extends Component {
    constructor(props) {
        super(props)
    }

    handler() {
        this.setState({
          uri: ''
        })
    }

    renderPlaylist() {

        const {

            items: items
        } = this.props;

        const playlists = _.map(items, (value, key) => {
            return (
                <View>
                    <PlaylistItems handler = {this.handler} key={key} playlistId={key} playlist={value} />
                </View>
            );
        });

        if (!_.isEmpty(playlists)) {
            return playlists;
        }


        return (
            <View style={styles.container}>
                <LoadingIndicator />

                <Text>Playlist is Empty</Text>

            </View>
        );
    }

    componentDidMount() {
        //this.props.userId();
        const {
            user: user
        } = this.props;
        //this.props.playlist(user)
        const {

            items: items
        } = this.props;

        this.props.playlist(user.uid)



    }

    render() {
        return (
            <ScrollView>
            <View  style={styles.container}>
         
            <View>
    
                {this.renderPlaylist()}
            </View>
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
)(Playlist);