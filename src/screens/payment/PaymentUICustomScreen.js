import React, { useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStripe, Address, BillingDetails, StripeProvider } from '@stripe/stripe-react-native';
import { colors } from './colors';
import Button from './Button';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';
import PaymentScreen from './PaymentScreen';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { AppStyles, useTheme, AppIcon } from '../../AppStyles';
import {
  ButtonCommon,
  ButtonConditional,
  ButtonText,
  FloatingNormalCard,
  InputField,
  TextSubTitle
} from '../../components';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

export default function PaymentsUICustomScreen({ route, navigation }) {
  const { AppColor } = useTheme();
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
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentOption) {
      setPaymentMethod({
        label: paymentOption.label,
        image: paymentOption.image
      });
    } else {
      setPaymentMethod(null);
    }
    console.log(paymentSheetEnabled, Number(brutPrice), paymentMethod);
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
        backgroundColor: AppColor.error
      });
    } else {
      showMessage({
        duration: 4000,
        message: `Demande de réservation effectué avec succès !`,
        description: 'Réservez votre prochaine borne dès maintenant',
        type: 'success',
        backgroundColor: AppColor.pulsive
      });
      navigation.goBack();
    }
    setLoading(false);
  };

  const dollarMask = createNumberMask({
    prefix: ['€', ' '],
    delimiter: '.',
    separator: ',',
    precision: 2
  });

  return (
    <StripeProvider
      publishableKey="pk_test_51JKmWpGB07Bddq7mTyK0kTy9mxkFiD3PFxADPd7Ig0i0LLI2iAwUym5bTzRtjwyyH1aA1rM7QLADb8O21UisPCId00udEw4kUG"
      threeDSecureParams={{
        backgroundColor: AppColor.background, // iOS only
        timeout: 5,
        label: {
          headingTextColor: AppColor.text,
          headingFontSize: 13
        },
        navigationBar: {
          headerText: '3d secure'
        },
        footer: {
          backgroundColor: AppColor.background // iOS only
        },
        submitButton: {
          backgroundColor: AppColor.text,
          cornerRadius: 12,
          textColor: AppColor.text,
          textFontSize: 14
        }
      }}
    >
      <PaymentScreen onInit={initialisePaymentSheet}>
        <View>
          <TextSubTitle title="Ajouter de l'argent" style={{ paddingLeft: 50, paddingTop: 20 }} />
          <MaskInput
            value={brutPrice}
            style={{
              color: AppColor.text,
              textAlign: 'center',
              fontSize: 50,
              fontWeight: 'bold',
              marginTop: 100,
              marginBottom: 40
            }}
            onChangeText={(masked, unmasked) => {
              setBrutPrice(unmasked);
            }}
            mask={dollarMask}
            autoFocus={true}
          />
        </View>

        <FloatingNormalCard
          style={{
            width: '98%',
            marginTop: 30
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColor.bottomColor,
                  marginRight: 10
                }}
              >
                <IconAwesome name="credit-card" size={14} color={AppColor.text} />
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <TextSubTitle
                  title="Carte de crédit"
                  style={{ fontSize: AppStyles.fontSize.content }}
                />
                <TextSubTitle
                  title={paymentMethod ? paymentMethod.label : 'Pas de carte de crédit'}
                  style={{ fontSize: AppStyles.fontSize.normal, fontWeight: '300' }}
                />
              </View>
            </View>
            <View>
              <Button
                style={{
                  backgroundColor: AppColor.bottomColor,
                  borderRadius: 25,
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                  marginRight: 5
                }}
                loading={loading}
                title="Modifier"
                disabled={!paymentSheetEnabled || !Number(brutPrice)}
                onPress={choosePaymentOption}
              />
            </View>
          </View>
        </FloatingNormalCard>

        <ButtonConditional
          title="Ajouter de l'argent"
          style={{ width: '98%', borderRadius: 15 }}
          isEnabled={paymentSheetEnabled && Number(brutPrice) && paymentMethod != null}
          loading={loading}
          onPress={onPressBuy}
        />
      </PaymentScreen>
    </StripeProvider>
  );
}
