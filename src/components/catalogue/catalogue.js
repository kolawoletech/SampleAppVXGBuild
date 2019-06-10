import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { fetchCatalogue } from "../../actions/api/actions";
import { CatalogueItems } from "./catalogueItems";
import LinearGradient from "react-native-linear-gradient";
import { AsyncStorage } from "react-native";

import { Dimensions } from "react-native";

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);

    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });

      this.forceUpdate()
    });
  }

  async componentDidMount() {
    
    await this.setDefaultWiFiOption();
    await this.setDefaultCurrency()
    await this.setDefaultRate() 
    //await this.getCatalogueWithAID();


  }

  async componentWillMount() {
    //await this.checkForNewUpdates()
    await this.setDefaultBufferOption()
    await this.getCatalogueWithAID();
    await this.setDefaultIndicatorLimit()
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }


  async getCatalogueWithAID() {
    let AID = await AsyncStorage.getItem("aid");
    let TOKENID = await AsyncStorage.getItem("sessionTokenID");
    this.props.loadCatalogue(AID, TOKENID);
  }

  async setDefaultCurrency() {
    try {
      let value = await AsyncStorage.getItem("currencySymbol");
      if (value != null) {
        console.log("Currency Already Set as " + value);
      } else {
        const userId = "R";
        AsyncStorage.setItem("currencySymbol", userId).then(token => {
          console.log(token);
        });
      }
    } catch (error) {
      console.log(err);
    }
  }

  async checkForNewUpdates(){
    try {
      let catalogueItems =this.props.catalogue;
      let result = catalogueItems.map(({ programme_id }) => programme_id).join(',');;
      var array = result.split(',');


      console.log("Structure of Items: " + typeof(result) + "The ARRAY: " + Array.isArray(array))
    } catch (error) {
      console.log("Structure of Items: " + error )

    }
  }

  async setDefaultRate() {
    try {
      let value = await AsyncStorage.getItem("costPerMB");
      if (value != null) {
        console.log("costPerMB Already Set as " + value);
      } else {
        const defaultCostPerMB = "0";
        AsyncStorage.setItem("costPerMB", defaultCostPerMB).then(token => {
          console.log(token);
        });
      }
    } catch (error) {
      console.log(err);
    }
  }

  async setDefaultBufferOption() {
    let context = this;

    let value = await AsyncStorage.getItem("bufferValue");

    if (value !== null) {
      // do nothing
      console.log("Option Already Set: " + value);
    } else {
      const bufferOption = "2000";

      AsyncStorage.setItem("bufferValue", bufferOption).then(value => {
        console.log(value);
      });
    }
  }


  async setDefaultIndicatorLimit() {
    let context = this;

    let value = await AsyncStorage.getItem("indicatorLimit");

    if (value !== null) {
      // do nothing
      console.log("Option Already Set: " + value);
    } else {
      const indicatorLimit = "2000";

      AsyncStorage.setItem("indicatorLimit", indicatorLimit).then(value => {
        console.log(value);
      });
    }
  }
  
  async setDefaultWiFiOption() {
    let context = this;

    let value = await AsyncStorage.getItem("wifiBoolValue");

    if (value !== null) {
      // do nothing
      console.log("Option Already Set: " + JSON.parse(value));
    } else {
      const wifiOption = JSON.stringify(true);

      AsyncStorage.setItem("wifiBoolValue", wifiOption).then(value => {
        console.log(value);
      });
    }
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      />
    );
  };

  render() {
    const { catalogue: data } = this.props;

    

   
    if (this.state.orientation == 'landscape'){
      return (
   
        <LinearGradient
          colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
          style={{ height: "100%" }}>
          <View style={{ height: "100%" }}>
            <CatalogueItems orientation={this.state.orientation} list={data} onPressItem={this.onRemoveChannel} />
          </View>
        </LinearGradient>
      );
    } else {

      return(
        <LinearGradient
        colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
        style={{ height: "100%" }}>
        <View style={{ height: "100%" }}>
        {/* //TODO Find out why importan */}
        <Text  orientation={this.state.orientation} ></Text>
        <CatalogueItems orientation={this.state.orientation} list={data} onPressItem={this.onRemoveChannel} />
        </View>
      </LinearGradient>
      )

    }
    
  }
}

const mapStateToProps = ({ apiReducer: { catalogue } }) => ({
  catalogue: catalogue
});

const mapDispatchToProps = {
  loadCatalogue: fetchCatalogue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalogue);
