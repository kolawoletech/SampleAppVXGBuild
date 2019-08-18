import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#0f516c'
  },
  guide: {
    alignItems: 'center',
    textAlign: 'center',
   width: '100%',
   height: 55,
   backgroundColor: '#0F516C',
   padding: 0,
   flexDirection: 'row'
  },
  image: {

    height: 100,
    marginBottom: 50
  },
  marginBox: {
    margin: 10
  },
  title: {
    fontSize: 24,
    margin: 20
  },
  item: {
    backgroundColor: '#0f516c',
    padding: 15,
    margin: 10,
  
  },
  text: {
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
    fontWeight:'600'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    alignItems:'center',
    paddingLeft: 4,

    
  },
  
  warningText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    alignItems:'center',
    paddingLeft: 4,

    
  },
  buttons: {
    flexDirection: 'row',
    color: '#fff'
  },
  pills: {
    alignItems: 'center',
    textAlign: 'center',
   width: '100%'
   
  },
});
