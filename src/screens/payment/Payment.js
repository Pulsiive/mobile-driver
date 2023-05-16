import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import {CardField, StripeProvider, useStripe} from '@stripe/stripe-react-native';
import Backend from "../services/Backend";

const PaymentForm = () => {
    const [token, setToken] = useState(null);
    const { confirmPayment } = useStripe();
    const [clientSecret, setClientSecret] = useState(null);
    useEffect(() => {
        const createPaymentIntent = async () => {
            const response = await Backend.createStripePaymentIntent();
            console.log(response);
            if (response.status === 200) {
                setClientSecret(response.data.client_secret)
            }
        }

        createPaymentIntent();
    }, []);

    const handlePayPress = async () => {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails: {
                    name: 'Test test',
                    email: 'test@mail.com'
                },
            }
        });

        if (error) {
            console.log('Erreur de paiement:', error);
        } else {
            console.log('Paiement confirmé:', paymentIntent);
            setToken(paymentIntent.id);
        }

        console.log(paymentIntent.paymentMethod);
        const response = await Backend.submitPayment(paymentIntent.id);
        console.log(response);
    };

    return (
        <StripeProvider
            publishableKey="pk_test_51JKmWpGB07Bddq7mTyK0kTy9mxkFiD3PFxADPd7Ig0i0LLI2iAwUym5bTzRtjwyyH1aA1rM7QLADb8O21UisPCId00udEw4kUG"
            threeDSecureParams={{
                backgroundColor: '#FFFFFF', // iOS only
                timeout: 5,
                label: {
                    headingTextColor: '#0000',
                    headingFontSize: 13,
                },
                navigationBar: {
                    headerText: '3d secure',
                },
                footer: { // iOS only
                    backgroundColor: '#FFFFFF',
                },
                submitButton: {
                    backgroundColor: '#000000',
                    cornerRadius: 12,
                    textColor: '#FFFFFF',
                    textFontSize: 14,
                },
            }}
        >
            <View>
                <CardField
                    postalCodeEnabled={false}
                    style={{ width: '100%', height: 200 }}
                />

                <Button title="Payer" onPress={handlePayPress} />

                {token && (
                    <View>
                        <Text>Token créé :</Text>
                        <Text>{token}</Text>
                    </View>
                )}
            </View>
        </StripeProvider>
    );
};

export default PaymentForm;
