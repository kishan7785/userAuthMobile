import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../responsive-text';
export default Slides = [
  {
    // id: 1,
    backgroundColor: '#fff',
    image: (
      <Image
        style={{height: scale(220), width: scale(220)}}
        source={require('../../assets/quickstart.png')}
      />
    ),
    title: (
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: normalizeText(28),
          marginBottom: scale(10),
          color: '#493d8a',
        }}>
        Quick Start
      </Text>
    ),
    subtitle: 'Grow fast and quick decisions are required !',
  },
  {
    // id: 2,
    backgroundColor: '#fff',
    image: (
      <Image
        style={{height: scale(220), width: scale(220)}}
        source={require('../../assets/easyusable.png')}
      />
    ),
    title: (
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: normalizeText(28),
          marginBottom: scale(10),
          color: '#493d8a',
        }}>
        Easy Usability
      </Text>
    ),
    subtitle: 'efficient use of resource should be necessary !',
  },
  {
    // id: 3,
    backgroundColor: '#fff',
    image: (
      <Image
        style={{height: scale(220), width: scale(330)}}
        source={require('../../assets/pastpayment.png')}
      />
    ),
    title: (
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: normalizeText(28),
          marginBottom: scale(10),
          color: '#493d8a',
        }}>
        Faster Payment
      </Text>
    ),
    subtitle: 'Adjust Your System to Speed your checkout !',
  },
  {
    // id: 4,
    backgroundColor: '#fff',
    image: (
      <Image
        style={{height: scale(220), width: scale(220)}}
        source={require('../../assets/notify.png')}
      />
    ),
    title: (
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: normalizeText(28),
          marginBottom: scale(10),
          color: '#493d8a',
        }}>
        Instant Notification
      </Text>
    ),
    subtitle: 'instanat Notefication makes feel good !',
  },
];
