import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Alert, Platform, Text, TouchableWithoutFeedback } from 'react-native';
import { FileSystem, Constants, Notifications, Permissions } from 'expo';
import Toast, { DURATION } from 'react-native-easy-toast';

async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        // this.toast = null;
        this.listenForNotifications = this.listenForNotifications.bind(this);
        // this.openFile = this.openFile.bind(this);
        this.state = {
            filePreviewText: ''
        }
    }

    _handleButtonPress = () => {
        let fileName = 'document.txt';
        let fileUri = FileSystem.documentDirectory + fileName;
        FileSystem.downloadAsync(
            "https://raw.githubusercontent.com/expo/expo/master/README.md",
            fileUri
        ).then(({ uri }) => {
            //console.log('Finished downloading to ', uri);

            const localnotification = {
                title: 'Download has finished',
                body: fileName + " has been downloaded. Tap to open file.",
                android: {
                    sound: true,
                },
                ios: {
                    sound: true,
                },

                data: {
                    fileUri: uri
                },
            };
            localnotification.data.title = localnotification.title;
            localnotification.data.body = localnotification.body;
            let sendAfterFiveSeconds = Date.now();
            sendAfterFiveSeconds += 3000;

            const schedulingOptions = { time: sendAfterFiveSeconds };
            Notifications.scheduleLocalNotificationAsync(
                localnotification,
                schedulingOptions
            );
        })
            .catch(error => {
                console.error(error);
                Alert.alert(error);
            });
    };
    listenForNotifications = () => {
        const _this = this;

        Notifications.addListener(notification => {
            if (notification.origin === 'received') {
                // We could also make our own design for the toast
                // _this.refs.toast.show(<View><Text>hello world!</Text></View>);

                const toastDOM =
                    <TouchableWithoutFeedback
                        onPress={() => { this.openFile(notification.data.fileUri) }}
                        style={{ padding: '10', backgroundColor: 'green' }}>
                        <Text style={styles.toastText}>{notification.data.body}</Text>
                    </TouchableWithoutFeedback>;

                _this.toast.show(toastDOM, DURATION.FOREVER);
            } else if (notification.origin === 'selected') {
                this.openFile(notification.data.fileUri);
            }
            // Expo.Notifications.setBadgeNumberAsync(number);
            // Notifications.setBadgeNumberAsync(10);
            // Notifications.presentLocalNotificationAsync(notification);
            // Alert.alert(notification.title, notification.body);
        });
    };
    componentWillMount() {
        getiOSNotificationPermission();
        this.listenForNotifications();
    }
    componentDidMount() {
        // let asset = Asset.fromModule(md);
        // Toast.show('Hello World');
    }
    openFile = (fileUri) => {
        this.toast.close(40);
        //console.log('Opening file ' + fileUri);
        FileSystem.readAsStringAsync(fileUri)
            .then((fileContents) => {
                // Get file contents in binary and convert to text
                // let fileTextContent = parseInt(fileContents, 2);
                this.setState({ filePreviewText: fileContents });
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <Button style={styles.button}
                        title={"Download text file"}
                        onPress={this._handleButtonPress}
                    />
                    <Button style={styles.button}
                        title={"Clear File Preview"}
                        onPress={() => { this.setState({ filePreviewText: "" }) }}
                    />
                </View>
                <ScrollView style={styles.filePreview}>
                    <Text>{this.state.filePreviewText}</Text>
                </ScrollView>
                <Toast ref={(ref) => this.toast = ref} />
            </View>
        );
        // <Toast
        //   ref={ (ref) => this.toast=ref }
        //   style={{backgroundColor:'green'}}
        //   textStyle={{color:'white'}}
        //   position={'bottom'}
        //   positionValue={100}
        //   opacity={0.8}
        // />
    }
}

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
});