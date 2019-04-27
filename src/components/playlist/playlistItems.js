import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert, Button} from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';

export class PlaylistItems extends React.Component {
    constructor(props) {
        super(props);
    
        //Video properties
        this.state = {
          repeat: false,
          paused: false,
          currentVideo: 0, // <-- moved it to state
        };
    
        //this.nextVideo = this.nextVideo.bind(this); //<-- bind method, since we're accessing this
      }

    _onPressPlay() {
       
        console.log("Checking" + this.props)
    }

    _onPressDelete() {
        Alert.alert('The user chose video #1!')
    }


    render() {

        if (this.props == "undefined") {
            return (
                <TouchableOpacity>
                    <Text>LOADING!</Text>
                </TouchableOpacity>
            );
        } else {
            const { items, playlist} = this.props;


            return (
                <View style={styles.item}>
                    <Text>{playlist.id}{" "}</Text>
                    <Text>{playlist.pid}{" "}</Text>
                    <Text>{playlist.file}{" "}</Text>
                    <Button
                        onPress={this._onPressPlay}
                        title="Play"
                    />
                    <Button
                        onPress={this._onPressDelete}
                        title="Remove"
                    />
                </View>
            );
        }

    }
}
