import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Button,
  TouchableHighlight
} from "react-native";
import RNFS from "react-native-fs";

import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";

import { connect } from "react-redux";


import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { CachedCatalogueItem } from "./cacheCatalogueItem"

export class CachedCatalogue extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props == "undefined") {
      return (
        <View>
          <LoadingIndicator />
        </View>
      );
    } else {

      return (
        <LinearGradient
          colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
          style={{ height: "100%", padding: 7 }}>
          <ScrollView>
            <View>
                <CachedCatalogueItem />
            </View>
          </ScrollView>
        </LinearGradient>
      );
    }
  }
}

const mapStateToProps = ({  }) => ({

});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CachedCatalogue);
