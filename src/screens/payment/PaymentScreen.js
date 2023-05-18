import {initStripe} from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { colors } from './colors';

const PaymentScreen = ({children, onInit}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            const publishableKey = 'pk_test_51JKmWpGB07Bddq7mTyK0kTy9mxkFiD3PFxADPd7Ig0i0LLI2iAwUym5bTzRtjwyyH1aA1rM7QLADb8O21UisPCId00udEw4kUG';
            if (publishableKey) {
                await initStripe({
                    publishableKey,
                    merchantIdentifier: 'merchant.com.stripe.react.native',
                });
                setLoading(false);
                onInit?.();
            }
        }
        initialize();
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
