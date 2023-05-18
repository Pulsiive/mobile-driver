import {initStripe, isPlatformPaySupported, PlatformPay, PlatformPayButton} from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { colors } from './colors';

const PaymentScreen = ({paymentMethod, children, onInit}) => {
    const [loading, setLoading] = useState(true);
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);

    useEffect(() => {
        (async function () {
            setIsApplePaySupported(await isPlatformPaySupported());
        })();
    }, [isPlatformPaySupported]);

    const pay = async () => {
        // ...
    };

    useEffect(() => {
        async function initialize() {
            const publishableKey = 'pk_test_51JKmWpGB07Bddq7mTyK0kTy9mxkFiD3PFxADPd7Ig0i0LLI2iAwUym5bTzRtjwyyH1aA1rM7QLADb8O21UisPCId00udEw4kUG';
            if (publishableKey) {
                await initStripe({
                    publishableKey,
                    merchantIdentifier: 'merchant.com.stripe.react.native',
                   //setReturnUrlSchemeOnAndroid: true
                });
                setLoading(false);
                onInit?.();
            }
        }
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
    ) : (
        <ScrollView
            accessibilityLabel="payment-screen"
            style={styles.container}
            keyboardShouldPersistTaps="always"
        >
            {children}
            <PlatformPayButton
                onPress={pay}
                type={PlatformPay.ButtonType.Checkout}
                appearance={PlatformPay.ButtonStyle.Black}
                borderRadius={4}
                style={{
                    marginTop: 100,
                    width: '100%',
                    height: 50,
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: 20,
        height: '100%',
        paddingHorizontal: 16,
    },
});

export default PaymentScreen;
