import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../responsive-text';
export default Slides = [
  {
    id: 1,
    backgroundColor: '#fff',
    image: require('../../assets/quickstart.png'),
    title: 'Quick Start',

    subtitle: 'Grow fast and quick decisions are required !',
  },
  {
    id: 2,
    backgroundColor: '#fff',
    image: require('../../assets/easyusable.png'),
    title: ' Easy Usability',

    subtitle: 'efficient use of resource should be necessary !',
  },
  {
    id: 3,
    backgroundColor: '#fff',
    image: require('../../assets/pastpayment.png'),
    title: 'Faster Payment',
    subtitle: 'Adjust Your System to Speed your checkout !',
  },
  {
    id: 4,
    backgroundColor: '#fff',
    image: require('../../assets/notify.png'),
    title: 'Instant Notification',

    subtitle: 'instanat Notefication makes feel good !',
  },
];
