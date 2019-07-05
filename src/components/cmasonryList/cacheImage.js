import React from 'react' ;
import { View, Image } from 'react-native';
class CacheImage extends React.Component {
    state = { source:null }
  
    render(){
      return(
         <Image style={this.props.style} source={this.state.source} />
       );
    }
}
export default CacheImage ;