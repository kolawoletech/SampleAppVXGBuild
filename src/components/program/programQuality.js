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
        const sizeInMB = Math.floor(parseInt(qualityList.size, 10) / 100000)

        if (qualityList.profile_id == 7) {
            let quality = 7;
        }
        //console.log(this.props)
        //console.log(onPressItem)

        //console.log(pid, qualityList.profile_id)

        return (

            <TouchableOpacity onPress={() => onPressItem(pid, qualityList.profile_id)} key={qualityList.profile_id} >

                {
                    // <Text>

                    //     {qualityList.profile_id === 7 && <Text style={styles.text}> LOW</Text>}
                    //     {qualityList.profile_id === 8 && <Text style={styles.text} >MED </Text>}
                    //     {qualityList.profile_id === 9 && <Text style={styles.text} > HIGH </Text>}

                    // </Text>

                    <View>

                        {qualityList.profile_id === 7 &&
                            <View>
                                <View style={styles.item}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="file-download" size={22} color="#fff" style={{
                                            top: 10
                                        }} />
                                        <Button color="white" title="LOW"></Button>

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
                                <Icon name="file-download" size={22} color="#fff" style={{
                                    top: 10
                                }} /><Button color="white" title="MED"></Button>
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
                                        <Icon name="file-download" size={22} color="#fff" style={{
                                            top: 10
                                        }} /><Button color="white" title="HIGH"></Button>
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
                        {/* 
                        {qualityList.profile_id === 8 && <View style={{ flexDirection: 'row' }}>
                            <Button icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />} color="white" title="MED"></Button></View>}

                        {qualityList.profile_id === 9 && <View style={{ flexDirection: 'row' }}>
                            <Button icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />} color="white" title="HIGH"></Button></View>}
 */}
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
