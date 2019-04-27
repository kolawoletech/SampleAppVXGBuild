import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import { FileSystem, Constants, Notifications, Permissions, DocumentPicker, Video, TouchableOpacity } from 'expo';
import { MediaItems } from './mediaItems';
import { connect } from 'react-redux';
import { PlayVideo, Stop, FetchVideos } from '../../actions/media/actions';
import VideoPlayer from '@expo/videoplayer';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';

export class Media extends Component {
    playerRef = undefined
    constructor(props) {
        super(props);
        this.index = 0;
        // this.toast = null;
        // this.openFile = this.openFile.bind(this);

        this.document_dir = FileSystem.documentDirectory + 'NileMediaVideos';

        this.filename_prefix = 'increment_photo_';

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            hideVideo: true,
            repeat: false,
            paused: false,
            videos: [],
            currentVideo: 0,
            showChild: true

        };



    }

    onPlayURI = (uri) => {
        this.setState ({
            hideVideo: false,
        })
        this.props.play(uri);
        this.loadWithRetry(this.playerRef, uri)
    }


    onDeleteURI = (uri) => {
        this.setState({
            hideVideo: true,
        })
        this.props.play(uri);
        FileSystem.deleteAsync(uri)

        this.setState ({
            showChild: false
        })

this.componentDidMount()
//this.componentWillUnmount()
this.componentWillMount()
        setTimeout(() => {
            this.setState({
                showChild: true
            })
        }, 100);

        console.log("Reload Child Invoked")


    }



    renderItem = (text, i) => {
        const { onPressItem } = this.props;

        const { _onPressDelete } = this.props;

        return (
            <TouchableOpacity style={styles.item} onPress={() => onPressItem(i)} key={i}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    };
    state = {
        is_camera_visible: false,
        is_photo_visible: false,
        has_camera_permission: null,
        //type: Camera.Constants.Type.back,
        progress_photos: []
    };



    _convertArrayToObject(input) {
        let loc = `${FileSystem.documentDirectory}NileMediaVideos/`;

        var arr = [];
        var len = input.length;
        for (var i = 0; i < len; i++) {
            arr.push({
                name: input[i],
                isVideo: true,
                uri: loc + input[i]
            });


        }
        return arr;
    }

    _convertArrayToObject2(input) {
        //let loc = `${FileSystem.documentDirectory}NileMediaVideos/`;

        var arr = [];
        var len = input.length;
        for (var i = 0; i < len; i++) {
            arr.push({
                name: input[i],
                isVideo: true,
                uri: loc + input[i]
            });


        }
        return arr;
    }


    async componentWillUnmount() {
        console.log('unmount')
        if (this.playerRef) {
            console.log('unmount has playerRef')
            try {
                console.log('unmount call unloadAsync')
                await this.playerRef.unloadAsync()
                console.log('unmount unload sucess')
            }
            catch (e) {
                console.log('unmount unload failed')
            }
        }
        else {
            console.log('unmount no playerRef')
        }
    }


    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async componentWillMount() {
        await this.loadWithRetry(this.playerRef, this.props.uri)
        console.log('load async success')
    }
    async componentWillMount() {
        let videos = this.state.videos
        this.props.fetch(videos);

        try {
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}NileMediaVideos`,
                {
                    intermediates: true
                }
            )

            const fileUri = FileSystem.documentDirectory + 'NileMediaVideos';
            filesArray = await Expo.FileSystem.readDirectoryAsync(fileUri);



            this.setState({
                data: filesArray,
            });
            const files = this.state.data

            const playlistObj = this._convertArrayToObject(files);


            this.setState({
                videos: playlistObj,
            });

            const videos = playlistObj;

            this.props.fetch(videos);


        } catch (e) {
            console.log(e)
        }
    }

    async loadWithRetry(player, uri) {
        for (let i = 0; i < 5; i++) {
            await player.unloadAsync()
            console.log('unload success')
            player.loadAsync(
                { uri: uri },
                { shouldPlay: true }
            )
            await this.timeout(41000)
            console.log('waited 3 seconds')
            const status = await player.getStatusAsync()
            console.log(status)
            if (status.isPlaying) {
                console.log('Already playing, no need to retry')
                break
            }
            else {
                console.log('Not playing, try to reload the same video')
                // await player.playAsync()
                // console.log('triggered play')
            }
        }
    }



    async loadWithRetry(player, uri) {
        for (let i = 0; i < 5; i++) {
            await player.unloadAsync()
            console.log('unload success')
            player.loadAsync(
                { uri: uri },
                { shouldPlay: true }
            )
            await this.timeout(3000)
            console.log('waited 3 seconds')
            const status = await player.getStatusAsync()
            console.log(status)
            if (status.isPlaying) {
                console.log('Already playing, no need to retry')
                break
            }
            else {
                console.log('Not playing, try to reload the same video')
                // await player.playAsync()
                // console.log('triggered play')
            }
        }
    }

    updatePlayerRef = async (ref) => {
        console.log('player changed')
        if (this.playerRef) {
            console.log('has old player')
            try {
                console.log('updatePlayerRef call unloadAsync')
                await this.playerRef.unloadAsync();
                console.log('updatePlayerRef unload old player sucess')
            }
            catch (e) {
                console.log('updatePlayerRef unload old player failed')
                console.log(e)
            }
        }
        else {
            console.log('no old player')
        }
        this.playerRef = ref
    }

    render() {
        const uri = this.props.uri

        const {
            videos: data,
            //uri: puri
        } = this.props;
        //console.log("1......11................." +puri)


        console.log("Logging DATA" + this.props.data)
        //console.log("2...............2......2" + puri)
        let videos = this.state.videos
        return (
            <LinearGradient colors={['#fff', '#fff', '#fff']}
                style={{ height: '100%' }}>
                <View  >


                    {this.state.hideVideo !== true &&
                        <VideoPlayer
                            videoProps={{
                                shouldPlay: false,
                                resizeMode: Video.RESIZE_MODE_CONTAIN,
                                source: {
                                    uri:
                                        "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                                },
                                isMuted: false,
                                ref: (ref) => {
                                    { this.playerRef = ref };
                                },
                            }}
                            showControlsOnLoad={true}

                            playFromPositionMillis={0}
                        />}


                </View>
                {this.state.showChild || this.state.data !== undefined?
                    <MediaItems list={data} _onPressDelete={this.onDeleteURI} onPressItem={this.onPlayURI} /> : <Text style= { styles.text}>Nothing Here</Text>}
                
            </LinearGradient>
        );

    }

}

const mapStateToProps = ({ mediaReducer: { videos, uri } }) => ({
    videos: videos,
    uri: uri
});

const mapDispatchToProps = {
    fetch: FetchVideos,
    play: PlayVideo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Media);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    text: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center'
      },
    button: {
        flex: 1
    },
    filePreview: {
        flex: 1,
        padding: 10,
    },
    toastText: {
        color: 'white',
        padding: 5,
        justifyContent: 'flex-start',
    },
    footer: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#76B6C4',
        borderColor: 'red',
        padding: 2,
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
});