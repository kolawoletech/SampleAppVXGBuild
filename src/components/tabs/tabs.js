import React from 'react';
import { ScrollView, View, Text, TouchableHighlight, Button, TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Channels from '../channels/channels'
import Catalogue from '../catalogue/catalogue'
//import Media from '../media/media'
import Icon from 'react-native-vector-icons/MaterialIcons';
const NILEMEDIA_LOGO = require('../../../assets/icons/nilemedia.png');
import LinearGradient from 'react-native-linear-gradient';


export default class Tabs extends React.Component {




  render() {
    return (
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <View >
          <LinearGradient
            colors={['#76B6C4', '#4E8FA2', '#0F516C']}
          > 
          <Text
            style={{
              paddingTop: 10,
              top: 25,
              fontWeight: 'bold',
              fontSize: 21,
              color: '#fff',
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              textAlignVertical: 'center'
            }}>Nile Media</Text>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={NILEMEDIA_LOGO} />
          </View>
        </LinearGradient>
        </View>

        <View style={styles.tabContainer}>
         
          <TouchableOpacity >
            <Icon name="event" size={22} color="black"
              style={{ position: 'absolute', top: 10, left: 50 }}
            />
            <Button color='black' title="Catalogue" onPress={() => { Actions.catalogue(); }}></Button>
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="live-tv" size={22} color="black"
              style={{ position: 'absolute', top: 10, left: 50 }}
            />
            <Button color='black' title="Channels" onPress={() => { Actions.channels(); }}></Button>
          </TouchableOpacity>
          

          <TouchableOpacity >
            <Icon name="playlist-play" size={22} color="black"
              style={{ position: 'absolute', top: 10, left: 50 }}
            />
            <Button color='black' title="Playlist" onPress={() => { Actions.media(); }}></Button>
          </TouchableOpacity>

          <TouchableOpacity >
            <Icon name="settings" size={22} color="black"
              style={{ position: 'absolute', top: 10, left: 50 }}
            />
            <Button color='black' title="Settings" onPress={() => { Actions.settings(); }}></Button>
          </TouchableOpacity>

          <TouchableOpacity >
            <Icon name="settings" size={22} color="black"
              style={{ position: 'absolute', top: 10, left: 50 }}
            />
            <Button color='black' title="AMP" onPress={() => { Actions.video(); }}></Button>
          </TouchableOpacity>
        </View>

      </ScrollView>

    );
  }
}

const styles = {
  container: {

    backgroundColor: '#76b6c4',

  },
  imageContainer: {


  },
  tabContainer: {

    backgroundColor: '#fff',

  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#',
    width: '100%',
    height: 56
  },
  buttonText: {
    color: 'green',

  },

  buttons: {
    flexDirection: 'row',
  },

  pills: {
    padding: 15,
    textAlign: 'center',
    flexDirection: 'column'
  },
  item: {
    backgroundColor: '#0f516c',
    padding: 15,
    width: '33%',
    float: 'left'
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 35
  },
  image: {
    width: 54,
    height: 54
  }
};