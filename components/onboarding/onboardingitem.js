import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../responsive-text';

export default function OnBoardingItem({item}) {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: normalizeText(28),
    marginBottom: scale(10),
    color: '#493d8a',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: scale(64),
  },
});
