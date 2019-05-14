import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Button, Image, ImageBackground } from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import moment from "moment";
import 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';



export class GuideItems extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showTheThing: false,
            images: [],
            markedDate: moment(new Date()).format("YYYY-MM-DD")
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
        //Actions.refresh({ key: 'drawer', open: false });
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

                return { id, img }
            })

    }
    renderItem = (data) => {
        const end = moment(data.item.end_date_time).format("h:mm a");
        const start= moment(data.item.start_date_time).format("h:mm");
        return (
            <View>
                <TouchableOpacity style={styles.item} key={data.item.start_date_time} >
                    <LinearGradient
                        colors={['#0F516C', '#76B6C4']}
                        style={{
                            borderRadius: 3,
                        }}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >

                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 7,
                                borderRadius: 3,

                            }}>
                            <View
                            style={{
                                width: '30%',
                               

                            }}>
                             
                               <Text
                               style={{
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                fontSize: 12,
                                color: 'white',
                            
                                top:'50%'

                            }}
                               > {start}-{end}</Text>

                            </View>
                            <View
                                style={{
                                    padding: 7,
                                    width: '70%',

                                }}>
                                <Text
                                
                                    style={styles.programTitle}
                                    color='white'
                                >{data.item.name}</Text>
                                <Text
                                    
                                    style={styles.programDescription}
                                    color='white'
                                ></Text>

                                <Text
                                  
                                    style={styles.programDescription}
                                    color='white'
                                >{data.item.description}</Text>

                            </View>

                        </View>


                    </LinearGradient>

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
        } else if(this.props.list != null){
            const { list } = this.props;
            console.log(list + "  Empty "+ this.props.list )
            return (
                <View>
                {this.state.images.length === 0 && <FlatList
                    data={list}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.start_date_time.toString()}

                />}
                {this.state.images.length > 0 &&
                    <FlatList
                        data={list}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.start_date_time.toString()}
                        
                    />}
            </View>
            );
           
             
        } else {
            return(
                <View>
                    <Text>Nothing is scheduled Yet</Text>
                </View>
               )
        }
    }
}
