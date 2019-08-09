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
    fontFamily: 'RedHatDisplay-Bold'
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
	}
})
