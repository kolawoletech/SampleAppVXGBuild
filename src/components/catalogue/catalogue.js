import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchCatalogue } from '../../actions/api/actions';
import { CatalogueItems } from './catalogueItems';
import LinearGradient from 'react-native-linear-gradient';
import { AsyncStorage } from "react-native";


class Catalogue extends Component {

  async componentDidMount() {
    await this.getCatalogueWithAID();
    await this.setDefaultWiFiOption();
    
  }

  async getCatalogueWithAID(){
    let AID = await AsyncStorage.getItem("aid");
    this.props.loadCatalogue(AID)
  }

  async setDefaultWiFiOption() {
    let context = this;
    
    let value = await AsyncStorage.getItem("wifiBoolValue");

    if (value != null) {
      // do nothing
      console.log("Option Already Set: "  + JSON.parse(value) );

    } else {

      const wifiOption = JSON.stringify(true);

      AsyncStorage.setItem("wifiBoolValue", wifiOption).then(value => {
        console.log(value);
      });
    }
    
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

    const {
      catalogue: data
    } = this.props;


    return (
      <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
        style={{ height: '100%' }}> 
        <View style={{ height: '100%' }}>
          <CatalogueItems list={data} onPressItem={this.onRemoveChannel} />
      
        </View>

     </LinearGradient>
 


    );
  }
}

const mapStateToProps = ({  apiReducer: { catalogue } }) => ({
  catalogue: catalogue
});

const mapDispatchToProps = {
  loadCatalogue: fetchCatalogue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalogue);
