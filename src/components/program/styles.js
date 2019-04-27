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
    backgroundColor: '#76B6C4'
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
    backgroundColor: '#0f516c',
    padding: 15,
    margin: 10,

  },
  text: {
    color: '#000',
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
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 1,
    flexDirection: "row"
  },
  toastText: {
    color: 'white',
    padding: 5,
    justifyContent: 'flex-start',
  },
  pills: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
});
