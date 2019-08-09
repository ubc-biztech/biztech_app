import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
 text: {
    fontFamily: 'RedHatDisplay-Regular'
  },
 colour: {
    fontFamily: 'RedHatDisplay-Regular',
    color: '#7ad040'
  },
 h1: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 36
  },
 h3: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 18,
    color: 'black'
  },
	widgetContainer: {
		padding: 20
	},
	content: {
		padding: 10,
    paddingTop: 0
	},
	center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
	},
	button: {
		color: '#fff',
		padding: 14,
		backgroundColor: '#7ad040',
		marginVertical: 10,
    borderRadius: 30,
	},
	buttonText: {
    fontFamily: 'RedHatDisplay-Bold',
		color: '#fff',
		textAlign: 'center',
	},
	card: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    backgroundColor: '#ffffff',
    paddingBottom: 5,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
	},
})