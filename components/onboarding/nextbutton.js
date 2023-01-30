import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {normalizeText} from '../../responsive-text';
import { scale } from 'react-native-size-matters';

export default function NextButton({percentage, scrollTo}) {
  const size = scale(100);
  const strokewidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokewidth / 2;
  const circumfence = 2 * Math.PI * radius;

  const [value, setvalue] = useState(0);

  const progressAnimation = useRef(new Animated.Value(0)).current;
  // console.log('progressAnimation:', progressAnimation);
  const progressref = useRef(null);
  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation(percentage);

    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumfence - (circumfence * value.value) / 100;

        setvalue(strokeDashoffset);
      },
      // [percentage],
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Svg height={size} width={size}>
        <G rotation={-90} origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokewidth}
          />
          <Circle
            fill={'white'}
            stroke="#F4338F"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokewidth}
            strokeDasharray={circumfence}
            strokeDashoffset={value}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}>
        <AntIcon name="arrowright" size={scale(18)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#f4338f',
    borderRadius: 100,
    padding: 20,
  },
});
