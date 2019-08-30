import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  channelContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: "space-around"
  },
  container: {
    flex: 1,

    alignItems: "stretch",
    backgroundColor: "#323232"
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
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    marginBottom: 5
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
  },
  progressBar: {
    width: "100%",
    transform: [{ scaleX: 2.0 }, { scaleY: 8.0 }],
    color: "#fff"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row"
  },
  progressBarContainer: {
  

    flexDirection: "row"
  },

  passwordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingBottom: 10
  },
  inputStyle: {
    flex: 1
  },
  newInput: {
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 16,

    height: 50
  },
  player: {
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "100%"
  },
  progress: {
    margin: 10
  }
});
