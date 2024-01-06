import React, { useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStripe, Address, BillingDetails, StripeProvider } from '@stripe/stripe-react-native';
import { colors } from './colors';
import Button from './Button';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';
import PaymentScreen from './PaymentScreen';
import MaskInput, { createNumberMask } from 'react-native-mask-input';

export default function PaymentsUICustomScreen({ route, navigation }) {
  const [brutPrice, setBrutPrice] = useState('15');
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState();
  const stateRef = useRef();

  stateRef.current = paymentIntentId;

  const fetchPaymentSheetParams = async () => {
    const response = await Backend.createStripePaymentIntent(Number(brutPrice) * 100);
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

    await Backend.updateStripePaymentIntent(Number(brutPrice) * 100, paymentIntentId);

    const { error } = await confirmPaymentSheetPayment();

    await Backend.submitPayment(paymentIntentId);

    if (error) {
      showMessage({
        duration: 4000,
        message: `Une erreur est survenue`,
        type: 'danger',
        backgroundColor: 'red'
      });
    } else {
      showMessage({
        duration: 4000,
        message: `Paiement effectué avec succès !`,
        description: 'Réservez votre prochaine borne dès maintenant',
        type: 'success',
        backgroundColor: 'green'
      });
      navigation.goBack();
      /*const { data, status } = await Backend.bookSlot(slot_id);
      console.log(data, status);
      if (status === 200) {
        showMessage({
          duration: 4000,
          message: `Créneau réservé avec succès !`,
          description: 'Retrouvez vos réservations sur votre planning.',
          type: 'success',
          backgroundColor: 'green'
        });
        navigation.navigate('PlanningStack');
      }
      setPaymentSheetEnabled(false);*/
    }
    setLoading(false);
  };

  const dollarMask = createNumberMask({
    prefix: ['€', ' '],
    delimiter: '.',
    separator: ',',
    precision: 2,
  })

  return (
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
        <View style={{ marginTop: '20%'}}>
          <Text
            style={{color: 'white', textAlign: 'center', fontSize: 10, fontWeight: 'bold', marginBottom: 50}}
          >
            Entrer le montant
          </Text>
          <MaskInput
            value={brutPrice}
            style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 'bold'}}
            onChangeText={(masked, unmasked) => {
              setBrutPrice(unmasked);
            }}
            mask={dollarMask}
            autoFocus={true}
          />
        </View>
        <View style={{ marginTop: '20%' }}>
          <Button
            variant="primary"
            loading={loading}
            title={'Choisir une méthode de paiement'}
            disabled={!paymentSheetEnabled || !Number(brutPrice)}
            onPress={choosePaymentOption}
          />
        </View>

        <View style={styles.section}>
          <Button
            variant="primary"
            loading={loading}
            disabled={!paymentSheetEnabled || !Number(brutPrice) || !paymentMethod}
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
