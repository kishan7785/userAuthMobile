import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Button from '../../../../constants/custButton';
import auth from '@react-native-firebase/auth';
import {normalizeText} from '../../../../responsive-text';
import {styles} from '../register/styles';

export default function MobileVerify({navigation}) {
  const [islogout, setIslogout] = useState(false);
  const [IsConfirm, setIsConfirm] = useState(false);
  const [isVerify, setIsverify] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [Num, setNum] = useState('+91');
  const [code, setCode] = useState('');

  function onAuthStateChanged(user) {
    // console.log('User:', user);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });
  function validateMobile(Number) {
    const re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // console.log(re.test(Number));
    return re.test(Number);
  }
  async function signInWithPhoneHandler() {
    // console.log(Num);

    if (Num == '') {
      alert('Please Fill');
    } else if (validateMobile(Num) == false) {
      Alert.alert('Mobile Number', "Can't be Null");
    } else {
      try {
        setIsverify(true);
        const confirmation = await auth().signInWithPhoneNumber(Num);
        console.log('confirmation:', confirmation);
        setConfirm(confirmation);
        setIsverify(false);
      } catch (e) {
        if (e.code == 'auth/invalid-phone-number') {
          alert('Please Provide Valid Number');
          setIsverify(false);
        }
      }
    }
  }
  async function confirmCode() {
    if (code == '') {
      alert('please - Fill Code');
    }
    try {
      setIsConfirm(true);
      console.log(code);
      await confirm.confirm(code);
      Alert.alert('Success');
      setIsConfirm(false);
      navigation.navigate('home');
    } catch (error) {
      Alert.alert('Invalid code.');
      setIsConfirm(false);
    }
  }
  return (
    <View style={styles.maincontainer}>
      <View style={styles.innerView}>
        <Image
          source={require('../../../../assets/register.jpg')}
          style={styles.logostyle}
        />
        <Text style={styles.textstyle}>register !</Text>
      </View>

      {!confirm ? (
        <View>
          <TextInput
            style={{
              padding: scale(10),
              backgroundColor: '#ccc',
              marginHorizontal: scale(20),
              borderRadius: scale(10),
              marginBottom: scale(10),
              color: 'black',
              fontSize: normalizeText(14),
            }}
            value={Num}
            onChangeText={text => setNum(text)}
            placeholder={'Please Enter your Number'}
            maxLength={13}
            keyboardType={'phone-pad'}
          />
          {isVerify ? (
            <Button>
              <ActivityIndicator size={'small'} color={'white'} />
            </Button>
          ) : (
            <Button onpress={signInWithPhoneHandler}>Verify Number</Button>
          )}
        </View>
      ) : (
        <View>
          <TextInput
            style={{
              padding: scale(10),
              backgroundColor: '#ccc',
              marginHorizontal: scale(20),
              borderRadius: scale(10),
              marginBottom: scale(10),
              color: 'black',
              fontSize: normalizeText(14),
            }}
            value={code}
            onChangeText={text => setCode(text)}
            placeholder={'please EnterCode'}
            maxLength={6}
          />
          {IsConfirm ? (
            <Button>
              <ActivityIndicator size={'small'} color={'white'} />
            </Button>
          ) : (
            <Button onpress={confirmCode}>Confirm Code</Button>
          )}
        </View>
      )}
      <View style={styles.viewafterLogin}>
        <Pressable
          onPress={() => {
            navigation.navigate('register');
          }}>
          <Text style={styles.registerTxtStyle}>Sign-up!</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Text style={styles.registerTxtStyle}>Already A user?</Text>
        </Pressable>
      </View>
    </View>
  );
}
