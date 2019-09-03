import {
    SQIPCardEntry, SQIPCore,
  } from 'react-native-square-in-app-payments';
import { Picker, Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Component} from 'react';
// import Modal from 'react-native-modal';
import OrderModal from '../components/SquarePayments/OrderModal';
import GreenButton from '../components/SquarePayments/GreenButton';
import {
  printCurlCommand,
  showAlert,
} from '../Utilities';
import chargeCardNonce from '../components/SquarePayments/Charge';
  
  export default class SquarePayments extends Component {

    state = {
      showingBottomSheet: false,
      showingCardEntry: false,
      showingDigitalWallet: false,
      canUseDigitalWallet: false,
      // applePayState: applePayStatus.none,
      // applePayError: null,
    }

    constructor() {
      super();
      this.onStartCardEntry = this.onStartCardEntry.bind(this);
      //this.onShowCardEntry = this.onShowCardEntry.bind(this);
      this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
      this.onCardEntryCancel = this.onCardEntryCancel.bind(this);
      this.onCardEntryComplete = this.onCardEntryComplete.bind(this);
      // this.onApplePayRequestNonceSuccess = this.onApplePayRequestNonceSuccess.bind(this);
      // this.onApplePayRequestNonceFailure = this.onApplePayRequestNonceFailure.bind(this);
      // this.onApplePayComplete = this.onApplePayComplete.bind(this);
      // this.onGooglePayRequestNonceSuccess = this.onGooglePayRequestNonceSuccess.bind(this);
      // this.onGooglePayRequestNonceFailure = this.onGooglePayRequestNonceFailure.bind(this);
      // this.onGooglePayCanceled = this.onGooglePayCanceled.bind(this);
      //this.onShowDigitalWallet = this.onShowDigitalWallet.bind(this);
      this.showOrderScreen = this.showOrderScreen.bind(this);
      //this.startCardEntry = this.startCardEntry.bind(this);
      //TODO below method
      //this.closeOrderScreen = this.closeOrderScreen.bind(this);
    }

    async componentDidMount() {
        await SQIPCore.setSquareApplicationId('sq0idp-dso4A6j5-tiWPqvpnnz13g');
        if (Platform.OS === 'ios') {
            await SQIPCardEntry.setIOSCardEntryTheme({
            saveButtonFont: {
                size: 25,
            },
            saveButtonTitle: 'Pay 💳 ',
            keyboardAppearance: 'Light',
            saveButtonTextColor: {
                r: 255,
                g: 0,
                b: 125,
                a: 0.5,
            },
            });
          }
          //   try {
          //     await SQIPApplePay.initializeApplePay(APPLE_PAY_MERCHANT_ID);
          //     digitalWalletEnabled = await SQIPApplePay.canUseApplePay();
          //   } catch (ex) {
          //     console.log(ex);
          //   }
          // } else if (Platform.OS === 'android') {
          //   await SQIPGooglePay.initializeGooglePay(
          //     GOOGLE_PAY_LOCATION_ID, SQIPGooglePay.EnvironmentTest,
          //   );
          //   try {
          //     digitalWalletEnabled = await SQIPGooglePay.canUseGooglePay();
          //   } catch (ex) {
          //     console.log(ex);
          //   }
          // }
      
          // delete this if it doesn't work. Not sure if this is supposed to be here or not
          // might be related to apple/android pay
          this.setState({
            canUseDigitalWallet: digitalWalletEnabled,
          });
        
    }
  
    //...
  
    /**
     * Callback when the card entry is closed after call 'SQIPCardEntry.completeCardEntry'
     */
    onCardEntryComplete() {
      // Update UI to notify user that the payment flow is completed

      //TODO
      <text> "Completed payment" </text>
      // Take user to homepage and have pop-up saying payment processed
    }
  
    /**
     * Callback when successfully get the card nonce details for processig
     * card entry is still open and waiting for processing card nonce details
     * @param {*} cardDetails
     */
    // async onCardNonceRequestSuccess(cardDetails) {
    //   try {
    //     // take payment with the card details
    //     // await chargeCard(cardDetails);
  
    //     // payment finished successfully
    //     // you must call this method to close card entry
    //     await SQIPCardEntry.completeCardEntry(
    //       this.onCardEntryComplete(),
    //     );
    //   } catch (ex) {
    //     // payment failed to complete due to error
    //     // notify card entry to show processing error
    //     await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    //   }
    // }


    // See if this works instead of the one above
    async onCardNonceRequestSuccess(cardDetails) {
      if (this.chargeServerHostIsSet()) {
        try {
          await chargeCardNonce(cardDetails.nonce);
          SQIPCardEntry.completeCardEntry(() => {
            showAlert('Your order was successful',
              'Go to your Square dashbord to see this order reflected in the sales tab.');
          });
        } catch (error) {
          SQIPCardEntry.showCardNonceProcessingError(error.message);
        }
      } else {
        SQIPCardEntry.completeCardEntry(() => {
          printCurlCommand(cardDetails.nonce);
          showAlert(
            'Nonce generated but not charged',
            'Check your console for a CURL command to charge the nonce, or replace CHARGE_SERVER_HOST with your server host.',
          );
        });
      }
    }
  
    /**
     * Callback when card entry is cancelled and UI is closed
     */
    onCardEntryCancel() {
      // Handle the cancel callback
      this.showOrderScreen();
    }

    showOrderScreen() {
      this.setState({ showingBottomSheet: true });
    }

    // potentially TODO new method
    // closeOrderScreen() {

    // }

    //potentially TODO new method
    // onShowDigitalWallet() {

    // }

    // TODO potentially new method 
    // onShowCardEntry() {

    // }
  
    /**
     * An event listener to start card entry flow
     */
    async onStartCardEntry() {
      const cardEntryConfig = {
        collectPostalCode: false,
      };
      await SQIPCardEntry.startCardEntryFlow(
        cardEntryConfig,
        this.onCardNonceRequestSuccess,
        this.onCardEntryCancel,
      );
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Button
            onPress={this.onStartCardEntry}
            title="Start Card Entry"
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
	container: {
    alignSelf: 'stretch',
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 60
	},
	header: {
    color: '#333333',
    marginBottom: 20,
    fontSize: 25,
  },
  input: {
  	color: '#333333',
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomColor: '#7ad040',
    borderBottomWidth: 1
  },
  button: {
    paddingTop: 10,
    marginTop: 10,
  },
});