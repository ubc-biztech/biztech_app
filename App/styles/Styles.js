import { StyleSheet } from "react-native";

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

export default styles = StyleSheet.create({
  text: {
    fontFamily: "RedHatDisplay-Regular"
  },
  bold: {
    fontFamily: "RedHatDisplay-Bold"
  },
  whitebold: {
    fontFamily: "RedHatDisplay-Bold",
    color: "#ffffff"
  },
  colour: {
    fontFamily: "RedHatDisplay-Regular",
    color: "#7ad040"
  },
  h1: {
    fontFamily: "RedHatDisplay-Bold",
    fontSize: 36,
    lineHeight: 38,
    textAlignVertical: "center",
    textAlign: "center",
    paddingTop: 20
  },
  h3: {
    fontFamily: "RedHatDisplay-Bold",
    fontSize: 18,
    color: "black"
  },
  widgetContainer: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  pageContainer: {
    paddingVertical: 0,
    paddingHorizontal: 20
  },
  content: {
    padding: 10,
    paddingTop: 0
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  button: {
    color: "#fff",
    padding: 14,
    backgroundColor: "#7ad040",
    marginVertical: 10,
    borderRadius: 30
  },
  buttonDisabled: {
    color: "#fff",
    padding: 14,
    backgroundColor: "#bbb",
    marginVertical: 10,
    borderRadius: 30
  },
  buttonText: {
    fontFamily: "RedHatDisplay-Bold",
    color: "#fff",
    textAlign: "center"
  },
  card: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingBottom: 5,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4
  },

  loginLogo: {
    width: 80 / 2,
    height: 110 / 2,
    marginBottom: 10
  },

  //form stuff
  container: {
    alignSelf: "stretch",
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 40,
    paddingBottom: 60
  },
  input: {
    fontFamily: "RedHatDisplay-Regular",
    color: "#333333",
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: "#7ad040",
    borderBottomWidth: 1
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});
