import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchCatalogue } from '../../actions/api/actions';
import { CatalogueItems } from './catalogueItems';


class Catalogue extends Component {

  componentDidMount() {
    this.props.loadCatalogue();
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
    /*   <LinearGradient colors={['#fff', '#fff', '#fff']}
        style={{ height: '100%' }}> */
        <View style={{ height: '100%' }}>
          <CatalogueItems list={data} onPressItem={this.onRemoveChannel} />
      
        </View>

/*       </LinearGradient>
 */


    );
  }
}

const mapStateToProps = ({  apiReducer: { catalogue } }) => ({
  
  //token: apiReducer.token,
  catalogue: catalogue
});

const mapDispatchToProps = {
  loadCatalogue: fetchCatalogue,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalogue);
