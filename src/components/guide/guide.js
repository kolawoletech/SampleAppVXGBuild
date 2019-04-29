import React, { Component } from 'react';
import { View, Button, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { fetchCatalogue, fetchChannelGuide } from '../../actions/api/actions';
import { GuideItems } from './guideItems';
import LinearGradient from 'react-native-linear-gradient';

 
class Guide extends Component {

  componentDidMount() {
    this.props.loadGuide(this.props.channelID);
  }

  FlatListItemSeparator = () => {
    return (
      <View 
        style={{
            height: .5,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
    );
  }

  render() {

    const {
      guide: guideData
    } = this.props;

    console.log(JSON.stringify(this.props))


    return (
    <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
        style={{ height: '100%' }}> 
        <GuideItems list={guideData} />

     </LinearGradient>



    );
  }
}

const mapStateToProps = ({  apiReducer: { guide} }) => ({
  guide:guide
});

const mapDispatchToProps = {
  loadGuide: fetchChannelGuide  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guide);
