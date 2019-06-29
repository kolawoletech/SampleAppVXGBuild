import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { registerUser, fetchChannelImage } from '../../actions/api/actions';

//import { LinearGradient } from 'expo';

import _ from "lodash";


class Landing extends Component {

    async componentDidMount() {
        // `Get` Images
        this.props.register()
        //console.log(this.props.register())
    }

    async componentWillMount() {
        // Get Channelsa

        //await this.getChannelImages();
    }


    async getChannelsWithoutImage() {
        // this.props.register()

    }


    FlatListItemSeparator = () => {
        return (
            <View style={{
                flexDirection: 'row',
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }



    renderChannels() {
        const ChannelsSection = data.map((channel, i) => {
            return (
                <View>

                </View>
            );
        });
        return (
            ChannelsSection
        );
    }

    render() {

        const {
            channels: data,
        } = this.props;


        let id = _.map(data, function (item) {
            return id = item['id']

        })

        //console.log(this.props)

        const { img: img } = this.props



        return (
/*             <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
                style={{ height: '100%' }}> */
                <View style={styles.container}>
                    {/* item is object with user's name and its other details on it */}
                    {data.map((dat, index) => {
                        return (<View style={styles.container}>

                        <Text key={dat.id}>{dat.name}</Text>
                        <Text>{dat.id}</Text>
                        <Image style={ styles.image} source={{uri: img }} />
                        </View>
                        );
                    })}
                </View>


/*             </LinearGradient >
 */        );
    }
}

const mapStateToProps = ({ routes, apiReducer: { channels, img, channel } }) => ({
    routes: routes,
    channels: channels,
    img: img,
    channel: channel
});

const mapDispatchToProps = {
    register: registerUser,
    getImageURI: fetchChannelImage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing);
