import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

//import { Permissions, Camera, FileSystem } from 'expo';
import { fetchProgramURILink, getUID } from '../../actions/api/actions';


import Toast, {DURATION} from 'react-native-easy-toast'

export class ProgramQuality extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            aid : ""
        }
    }



    handleButtonPress = () => {
    };

    async componentDidMount(){
        await AsyncStorage.getItem("aid").then((result) => {
            console.log(result)
            this.setState({
                aid: result
            })
        });

        console.log("Loadedf Chiledldj: =>" + this.state.aid)


    }

    renderItem = (qualityList) => {
        const { pid } = this.props;
        const { onPressItem } = this.props;
        const sizeInMB = Math.floor(parseInt(qualityList.size, 10) / 1000000)

        if (qualityList.profile_id == 7) {
            let quality = 7;
        }


        return (

            <TouchableOpacity onPress={() => onPressItem(pid, qualityList.profile_id, this.state.aid)} key={qualityList.profile_id} >

                {
                    <View>

                        {qualityList.profile_id === 7 &&
                            <View>
                                <View style={styles.item}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="file-download" size={22} color="#fff" />
                                        <Text style={styles.buttonText} >LOW</Text>

                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 10

                                        }}>{qualityList.video.width}x{qualityList.video.height}</Text>

                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 11

                                        }}>{sizeInMB} MB</Text>
                                </View>
                            </View>}


                        {qualityList.profile_id === 8 && <View><View style={styles.item}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="file-download" size={22} color="#fff" />
                                <Text style={styles.buttonText} >MEDIUM</Text>
                            </View>
                        </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#fff',
                                        flexWrap: 'wrap',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        fontSize: 10
                                    }}>{qualityList.video.width}x{qualityList.video.height}</Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#fff',
                                        flexWrap: 'wrap',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        fontSize: 11


                                    }}>{sizeInMB} MB</Text>
                            </View>

                        </View>}


                        {qualityList.profile_id === 9 &&
                            <View>
                                <View style={styles.item}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="file-download" size={22} color="#fff" />
                                        <Text style={styles.buttonText} >HIGH</Text>
                                    </View>

                                </View>

                                <View>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 10


                                        }}>{qualityList.video.width}x{qualityList.video.height}</Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 11
                                            ,

                                        }}>{sizeInMB} MB</Text>
                                </View>

                            </View>
                        }
                        <View>
                        <Toast ref="toast"/>
                        </View>

                    </View>

                }
            </TouchableOpacity>
        );

    }

    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
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
            const { pid } = this.props;

            return (
                <View style={styles.buttons}>{
                    qual.map(this.renderItem)}
                </View>

            );
        }

    }
}
