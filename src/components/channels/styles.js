import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  channelContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor:'#000'
  },
  image: {
    width: 100,
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
    padding: 3,
    margin: 2,
  
  },

  vertical: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row'
  },
  filePreview: {
    flex: 1,
    padding: 10,
  },
  toastText: {
    color: 'white',
    padding: 5,
    justifyContent: 'flex-start',
  },
  pills: {
    alignItems: 'center',
    textAlign: 'center',
   backgroundColor: 'black',
   width: '100%'
    
  },
});
