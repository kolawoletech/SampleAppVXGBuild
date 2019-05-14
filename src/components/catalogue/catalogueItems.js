import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { AsyncStorage } from "react-native";

export class CatalogueItems extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showTheThing: false,
            images: []
        }
    }

    componentDidMount() {
        //console.log(this.props)
    }

    async  componentDidUpdate(prevProps) {
        if (this.props.list != prevProps.list) {

            const promises = this.props.list.map(item => {
                return this._getImage(item.programme_id)
            })

            const results = await Promise.all(promises)
            this.setState({
                images: results
            })
        }
    }


    async _getImage(id) {
        let AID = await AsyncStorage.getItem("aid");

       
        const options = {
            method: 'POST',
            body: "aid="+AID,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };


        const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
        const token = await fetch(url, options).then(token_data => token_data.json())
            .then(token_data => {

                //console.log("This is TOKEN from STORE "+ token_data["data"]);

                return token_data["data"];
            })
        const channels_options = {
            method: 'GET',

            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }

        const channel_url = 'https://nile.rtst.co.za/api/artist/6/programs/' + id + '/' + 'icon/';

        return await fetch(channel_url, channels_options)
            .then(icon => icon.json())
            .then(icon => {
                let img = icon["data"]


                //console.log(id, img)
                return { id, img }
            })

    }
    renderItem = (data) => {

        return (
            <View style={{ width: '50%', height: '50%' }}>
                <TouchableOpacity style={styles.item} key={data.item.programme_id} onPress={() => Actions.program({ programData: data.item })}>

                    <Card>
                        <CardImage
                            source={{ uri: this.state.images.find(a => data.item.programme_id === a.id) ? this.state.images.find(a => data.item.programme_id === a.id).img : 'https://newbietech.com.ng/placeholder-nile-logo-150.png' }}
                            resizeMode="stretch"
                            style={{
                                width: '100%', height: '80%', backgroundColor: 'transparent', maxHeight: 83, minHeight: 83
                            }}
                        />
{/*                         <Image
                            source={{ uri: this.state.images.find(a => data.item.programme_id === a.id) ? this.state.images.find(a => data.item.programme_id === a.id).img : 'https://newbietech.com.ng/placeholder-nile-logo-150.png', cache: 'only-if-cached' }}
                            resizeMode="stretch"
                            style={{
                                width: '100%', height: '80%', backgroundColor: 'transparent', maxHeight: 83, minHeight: 83
                            }}
                           
                        /> */}
                        <Icon size={22} color="white"
                            style={{ position: 'absolute', top: 10, left: 10 }} name="cloud-download" size={22} color="white" />

                        <Text
                            numberOfLines={2}
                            style={{ fontSize: 14, height: '20%', width: '100%', fontWeight: 'normal', backgroundColor: '#76b6c4', textAlign: 'center', color: 'white', maxHeight: 22, minHeight: 22 }}>
                            {data.item.name}
                        </Text>
                    </Card>
                </TouchableOpacity>
            </View>
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
                    <LoadingIndicator />
                </TouchableOpacity>
            );
        } else {
            const { list } = this.props;
            return (

                <View>
                    {this.state.images.length === 0 && <FlatList
                        data={list}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.programme_id.toString()}
                        numColumns={2}

                    />}
                    {this.state.images.length > 0 &&
                        <FlatList
                            data={list}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={item => item.programme_id.toString()}
                            numColumns={2}

                        />}

                </View>
            );
        }

    }
}
