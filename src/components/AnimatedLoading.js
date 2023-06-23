import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { AppStyles } from '../AppStyles';

const AnimatedLoading = ({ style }) => {
  const animationDot1 = useRef(new Animated.Value(10)).current;
  const animationDot2 = useRef(new Animated.Value(10)).current;
  const animationDot3 = useRef(new Animated.Value(10)).current;
  const animationDot4 = useRef(new Animated.Value(10)).current;
  const animationDot5 = useRef(new Animated.Value(10)).current;

  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(animate, 100);
    return () => {
      clearInterval(interval);
    };
  }, [animation]);

  const animate = () => {
    Animated.spring(animationDot1, {
      toValue: animation === 0 ? 4 : 10,
      useNativeDriver: true
    }).start();
    Animated.spring(animationDot2, {
      toValue: animation === 1 ? 4 : 10,
      useNativeDriver: true
    }).start();
    Animated.spring(animationDot3, {
      toValue: animation === 2 ? 4 : 10,
      useNativeDriver: true
    }).start();
    Animated.spring(animationDot4, {
      toValue: animation === 3 ? 4 : 10,
      useNativeDriver: true
    }).start();
    Animated.spring(animationDot5, {
      toValue: animation === 4 ? 4 : 10,
      useNativeDriver: true
    }).start();
    setAnimation((prevAnimation) => (prevAnimation === 4 ? 0 : prevAnimation + 1));
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.dot,
          ...(style || {}),
          ...{ transform: [{ translateY: animationDot1 }] }
        }}
      />
      <Animated.View
        style={{
          ...styles.dot,
          ...(style || {}),
          ...{ transform: [{ translateY: animationDot2 }] }
        }}
      />
      <Animated.View
        style={{
          ...styles.dot,
          ...(style || {}),
          ...{ transform: [{ translateY: animationDot3 }] }
        }}
      />
      <Animated.View
        style={{
          ...styles.dot,
          ...(style || {}),
          ...{ transform: [{ translateY: animationDot4 }] }
        }}
      />
      <Animated.View
        style={{
          ...styles.dot,
          ...(style || {}),
          ...{ transform: [{ translateY: animationDot5 }] }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: '40%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: AppStyles.color.lightmode
  }
});

export default AnimatedLoading;
