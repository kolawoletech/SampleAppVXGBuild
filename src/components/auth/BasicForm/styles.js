import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: 'transparent',
    padding: 5,
    height: 45,
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#7FCDFF'
  },
  buttonTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginBox: {
    margin: 5
  },

  actionButton:{
    color: '#0F516C', 
    margin: 100,
    
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 35
  },
  image: {
    width: 120,
    height: 120
  }
});
