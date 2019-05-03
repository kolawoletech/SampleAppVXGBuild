import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

//import { Permissions, Camera, FileSystem } from 'expo';
import { fetchProgramURILink, getUID } from '../../actions/api/actions';




export class ProgramQuality extends React.Component {




    handleButtonPress = () => {
    };



    renderItem = (qualityList) => {
        const { pid } = this.props;
        const { onPressItem } = this.props;
        const sizeInMB = Math.floor(parseInt(qualityList.size, 10) / 1000000)

        if (qualityList.profile_id == 7) {
            let quality = 7;
        }
        //console.log(this.props)
        //console.log(onPressItem)

        //console.log(pid, qualityList.profile_id)

        return (

            <TouchableOpacity onPress={() => onPressItem(pid, qualityList.profile_id)} key={qualityList.profile_id} >

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
