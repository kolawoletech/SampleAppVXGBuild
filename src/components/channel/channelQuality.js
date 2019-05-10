import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button} from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AsyncStorage } from "react-native";

export class ChannelQuality extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showTheThing: false,
            images: []
        }
    }
    renderItem = (qualityList) => {
        AsyncStorage.getItem("aid").then((result) => {
            let AID = result
        });



        const { cid } = this.props;

        const { onPressItem } = this.props;




        const { qual } = this.props;
            let result = qual.map(({ profile_id }) => profile_id)
            const min = Math.min(...result)

   
        return (

            <TouchableOpacity style={styles.item} key={qualityList.profile_id} onPress={() => (onPressItem(cid, qualityList.profile_id)) }>
                {qualityList.profile_id === min && <View style={{ flexDirection: 'row' }}>
                    <Icon name="play-arrow" size={22} color="white"
                    /><Text color="white" style={styles.buttonText} >LOW</Text></View>}
                {qualityList.profile_id === min+1 && <View style={{ flexDirection: 'row' }}>
                    <Icon name="play-arrow" size={22} color="white"
                    /><Text style={styles.buttonText} >MEDIUM</Text></View>}
                {qualityList.profile_id === min+2 && <View style={{ flexDirection: 'row' }}>
                    <Icon name="play-arrow" size={22} color="white"
                    /><Text style={styles.buttonText} >HIGH</Text></View>}
            </TouchableOpacity>
        );

    }


    render() {

        if (this.props == "undefined") {
            return (

                <TouchableOpacity>
                    <Text>LOADING!</Text>
                </TouchableOpacity>
            );
        } else {
            const { qual } = this.props;

            return (
                <View>
                    {this.state.images.length === 0 &&
                        <View>


                            <View style={styles.buttons}>
                                {qual.map(this.renderItem)}
                            </View>


                        </View>}
                    {this.state.images.length > 0 &&
                        <View style={styles.buttons}>{
                            qual.map(this.renderItem)}
                        </View>}
                </View>

            );
        }

    }
}
