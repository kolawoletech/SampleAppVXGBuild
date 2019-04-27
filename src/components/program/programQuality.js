import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';


//import { Permissions, Camera, FileSystem } from 'expo';
import { fetchProgramURILink, getUID } from '../../actions/api/actions';




export class ProgramQuality extends React.Component {


    checkForFolder() {
        const snapViewAsync = async (view, format = 'png') => {
            const ensureDirAsync = async (dir, intermediates = true) => {
                //const props = await FileSystem.getInfoAsync(dir)
                if (props.exist && props.isDirectory)
                    return props;

               //await FileSystem.makeDirectoryAsync(dir, { intermediates: true })

                return await ensureDirAsync(dir, intermediates)
            }
            const timestamp = (presision = 1) => {
                return Math.round((new Date()).getTime() / presision);
            }

            //const dir = await ensureDirAsync(FileSystem.documentDirectory + 'images/');
            const snapshot = `${dir.uri}${timestamp()}.${format}`;
            /* const temp = await Expo.takeSnapshotAsync(view, {
                format,
                quality: 1,
                result: 'file'
            }); */

            //await FileSystem.moveAsync({ from: temp, to: snapshot });

            //const info = await FileSystem.getInfoAsync(snapshot, { md5: true })
            const type = `image/${format}`;

            return { ...info, type };
        }
    }

    handleButtonPress = () => {
    };



    renderItem = (qualityList) => {
        const { pid } = this.props;
        const { onPressItem } = this.props;

        if (qualityList.profile_id == 7) {
            let quality = 7;
        }
        //console.log(this.props)
        //console.log(onPressItem)

        //console.log(pid, qualityList.profile_id)

        return (
            <TouchableOpacity style={styles.item} onPress={() => onPressItem(pid, qualityList.profile_id)} key={qualityList.profile_id} >
                {
                    <Text>

                        {qualityList.profile_id === 7 && <Text style={styles.text}> LOW</Text>}
                        {qualityList.profile_id === 8 && <Text style={styles.text} >MED </Text>}
                        {qualityList.profile_id === 9 && <Text style={styles.text} > HIGH </Text>}

                    </Text>
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
