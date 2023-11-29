import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useStripe, Address, BillingDetails, StripeProvider } from '@stripe/stripe-react-native';
import { colors } from './colors';
import Button from './Button';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';
import PaymentScreen from './PaymentScreen';

export default function PaymentsUICustomScreen({ route, navigation }) {
  const slot_id = route.params.slot_id;
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  const fetchPaymentSheetParams = async () => {
    const response = await Backend.createStripePaymentIntent();
    if (response.status === 200) {
      setPaymentIntentId(response.data.id);
      return {
        paymentIntent: response.data.client_secret
      };
    }

    return {
      paymentIntent: null
    };
  };

  const initialisePaymentSheet = async () => {
    setLoading(true);

    try {
      const { paymentIntent } = await fetchPaymentSheetParams();
      console.log(paymentIntent);

      const address = {
        city: 'Paris',
        country: 'FR',
        line1: '4 rue quillier',
        line2: '123 rue',
        postalCode: '94102',
        state: 'IDF'
      };
      const billingDetails = {
        name: 'Test test',
        email: 'yk@mail.com',
        phone: '0693939388',
        address: address
      };

      const { error, paymentOption } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: 'Example Inc.',
        style: 'automatic',
        googlePay: { merchantCountryCode: 'FR', testEnv: true },
        //returnURL: 'stripe-example://stripe-redirect',
        defaultBillingDetails: billingDetails
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      } else {
        Alert.alert(`Error code: ${error.code}`, error.message);
      }
      if (paymentOption) {
        setPaymentMethod(paymentOption);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const choosePaymentOption = async () => {
    const { error, paymentOption } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentOption) {
      setPaymentMethod({
        label: paymentOption.label,
        image: paymentOption.image
      });
    } else {
      setPaymentMethod(null);
    }
  };

  const onPressBuy = async () => {
    setLoading(true);
    const { error } = await confirmPaymentSheetPayment();

    const response = await Backend.submitPayment(paymentIntentId);

    if (response.status !== 200) {
      Alert.alert(`Error code: ${response.status}`, response.data);
    }
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'The payment was confirmed successfully!');
      const { data, status } = await Backend.createReservationRequest({
        slotId: slot_id,
        price: 20
      });
      console.log(data, status);
      if (status === 200) {
        // Alert.alert('Success', 'The payment was confirmed successfully!');
        showMessage({
          duration: 4000,
          message: `Demande de réservation crée avec succès ! !`,
          description:
            'La réservation sera sur votre calendrier après acceptation du propriétaire.',
          type: 'success',
          backgroundColor: 'green'
        });
        navigation.navigate('Planning');
      } else if (status === 409) {
        // Alert.alert('Success', 'The payment was confirmed successfully!');
        showMessage({
          duration: 4000,
          message: `Désolé, le créneau a déjà été reservé`,
          description: 'Vous allez ếtre redirigé sur la page de planning',
          type: 'error',
          backgroundColor: 'red'
        });
        navigation.goBack();
      }
      setPaymentSheetEnabled(false);
    }
    setLoading(false);
  };

  return (
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    <StripeProvider
      publishableKey="pk_test_51JKmWpGB07Bddq7mTyK0kTy9mxkFiD3PFxADPd7Ig0i0LLI2iAwUym5bTzRtjwyyH1aA1rM7QLADb8O21UisPCId00udEw4kUG"
      threeDSecureParams={{
        backgroundColor: '#FFFFFF', // iOS only
        timeout: 5,
        label: {
          headingTextColor: '#000000',
          headingFontSize: 13
        },
        navigationBar: {
          headerText: '3d secure'
        },
        footer: {
          // iOS only
          backgroundColor: '#FFFFFF'
        },
        submitButton: {
          backgroundColor: '#000000',
          cornerRadius: 12,
          textColor: '#FFFFFF',
          textFontSize: 14
        }
      }}
    >
      <PaymentScreen onInit={initialisePaymentSheet}>
        <View style={{ marginTop: '20%' }}>
          <Button
            variant="primary"
            loading={loading}
            title={'Choisir une méthode de paiement'}
            disabled={!paymentSheetEnabled}
            onPress={choosePaymentOption}
          />
        </View>

        <View style={styles.section}>
          <Button
            variant="primary"
            loading={loading}
            disabled={!paymentMethod || !paymentSheetEnabled}
            title={`Payer${paymentMethod ? ` avec ${paymentMethod.label}` : ''}`}
            onPress={onPressBuy}
          />
        </View>
      </PaymentScreen>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    marginTop: 40
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  paymentMethodTitle: {
    color: colors.slate,
    fontWeight: 'bold'
  },
  image: {
    width: 26,
    height: 20
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12
  }
});
