import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchProgramURILink, getUID } from '../../actions/api/actions';


import Toast, {DURATION} from 'react-native-easy-toast'

export class ProgramQuality extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            aid : "",
            token:""
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

        await AsyncStorage.getItem("sessionTokenID").then((token) => {
            console.log(token)
            this.setState({
                token: token
            })
        });

        

        console.log("Loadedf Chiledldj: =>" + this.state.aid, this.state.token)


    }

    renderItem = (qualityList) => {
        const { pid } = this.props;
        const { onPressItem } = this.props;

        const { qual } = this.props;
        let result = qual.map(({ profile_id }) => profile_id);
        const min = Math.min(...result);

        const sizeInMB = Math.floor(parseInt(qualityList.size, 10) / 1000000)
  


        return (

            <TouchableOpacity onPress={() => onPressItem(pid, qualityList.profile_id, this.state.aid, this.state.token)} key={qualityList.profile_id} >

                {
                    <View>

                        {qualityList.profile_id === min &&
                            <View>
                                <View style={styles.item}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="file-download" size={22} color="#fff" />
                                        <Text style={styles.buttonText} >LOW</Text>
                                    </View>
                                </View>
                                <View>
                                    {qualityList.video !== null && (
                                        <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 10
                                        }}>{qualityList.video.bitrates_kbps}x{qualityList.video.height}
                                        </Text>
                                    )}
                                    {qualityList.video == null && (
                                        <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 10
                                        }}>{qualityList.audio.bitrates_kbps} Kb/s
                                        </Text>
                                    )}
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
                                        }}>{sizeInMB} MB
                                    </Text>
                                </View>
                            </View>}
                        {qualityList.profile_id === min + 1 && <View><View style={styles.item}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="file-download" size={22} color="#fff" />
                                <Text style={styles.buttonText} >MEDIUM</Text>
                            </View>
                        </View>
                            <View>
                            {qualityList.video !== null && (
                                <Text
                                    style={{
                                        color: '#fff',
                                        flexWrap: 'wrap',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        fontSize: 10
                                    }}>{qualityList.video.width}x{qualityList.video.height}
                                </Text>
                            )}

                            {qualityList.video == null && (
                                        <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 10

                                        }}>{qualityList.audio.bitrates_kbps} Kb/s
                                        </Text>
                                    )}
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


                        {qualityList.profile_id === min + 2 &&
                            <View>
                                <View style={styles.item}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="file-download" size={22} color="#fff" />
                                        <Text style={styles.buttonText} >HIGH</Text>
                                    </View>

                                </View>

                                <View>
                                    {qualityList.video !== null && (
                                        <Text
                                            style={{
                                                color: '#fff',
                                                flexWrap: 'wrap',
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                fontSize: 10


                                            }}>{qualityList.video.width}x{qualityList.video.height}
                                        </Text>
                                    )}

                                    {qualityList.video == null && (
                                        <Text
                                        style={{
                                            color: '#fff',
                                            flexWrap: 'wrap',
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 10

                                        }}>{qualityList.audio.bitrates_kbps} Kb/s
                                        </Text>
                                    )}
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
        console.log("Part 2 Onloading Quality Tabs " + JSON.stringify(this.props))
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
