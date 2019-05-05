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
    paddingTop: 40,
    alignItems: "stretch",
    backgroundColor: "#76B6C4"
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
    flexDirection: "column",
    backgroundColor: "#0f516c",
    padding: 15,
    margin: 10,
    marginBottom: 5
  },
  text: {
    color: "#000",
    fontSize: 16,
    textAlign: "center"
  },
  textTitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
  },
  play: {
    width: "60%",
    fontSize: 12
  },
  player: {
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "100%"
  },
  delete: {
    width: "30%",
    color: "red"
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#76B6C4",
    borderColor: "red",
    padding: 2,
    margin: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row"
  }
});
