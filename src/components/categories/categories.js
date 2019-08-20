import React, { Component, PureComponent } from "react";
import {
  View,
  AsyncStorage,
  Dimensions,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import faker from "faker";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
const SCREEN_WIDTH = Dimensions.get("window").width;

import {
  fetchCategories,
  fetchCategoryItems,
  sendCategoryMetadata
} from "../../actions/api/actions";
import { CategoryItems } from "./categoryItems";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);


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

    this.state = {
      categories: ""
    };
  }

  async getCategoriesWithAID() {
    let TOKENID = await AsyncStorage.getItem("sessionTokenID");
    let AID = await AsyncStorage.getItem("aid");
    this.props.registerWithAID(AID, TOKENID);
  }

  async componentDidMount() {
    await this.setDefaultWiFiOption();
    await this.setDefaultCurrency()
    await this.setDefaultRate() 

    await this.props.loadCategories();
    await this.props.loadCategoryItem();
  }

  async componentWillMount() {

    await this.setDefaultBufferOption()
    await this.getCatalogueWithAID();
    await this.setDefaultIndicatorLimit()

    await this.props.loadCategories();
    await this.props.loadCategoryItem();
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



  async setDefaultRate() {
    try {
      let value = await AsyncStorage.getItem("costPerMB");
      if (value != null) {
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

    } else {
      const bufferOption = "2000";

      AsyncStorage.setItem("bufferValue", bufferOption).then(value => {
        console.log(value);
      });
    }
  }


  async setDefaultIndicatorLimit() {
    let value = await AsyncStorage.getItem("indicatorLimit");

    if (value !== null) {
      // do nothing
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
    } else {
      const wifiOption = JSON.stringify(true);

      AsyncStorage.setItem("wifiBoolValue", wifiOption).then(value => {
        console.log(value);
      });
    }
  }




  render() {
    const { categories: data } = this.props;
    const { categoryItems: subData } = this.props;
    const { onfetchCategoryItems } = this.props.loadCategoryItem;

    console.log("Current Categories Props" + JSON.stringify(this.props));

    return (
      <View style={styles.container}>
        <CategoryItems
          list={data}
          sub={subData}
          onFetchItems={this.props.loadCategoryItem}
          onFetchCurrentCategory={this.props.getCurrentCategory}
        />
      </View>
    );
  }
}

const mapStateToProps = ({
  apiReducer: { categories, categoryItems, currentCategory }
}) => ({
  categories: categories,
  categoryItems: categoryItems,
  currentCategory: currentCategory
});

const mapDispatchToProps = {
  loadCategories: fetchCategories,
  loadCategoryItem: fetchCategoryItems,
  getCurrentCategory: sendCategoryMetadata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    minHeight: 1,
    minWidth: 1
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: SCREEN_WIDTH - (80 + 10 + 20)
  },
  image: {
    height: 275,
    width: 183
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 14,
    opacity: 0.5
  },
  listItem: {
    flexDirection: "row",
    margin: 10
  }
});
